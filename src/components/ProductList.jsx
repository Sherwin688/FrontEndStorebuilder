import {
  IndexTable,
  LegacyCard,
  Text,
  Badge,
  ButtonGroup,
  Button,
  Box,
  Pagination,
  HorizontalStack,
  SkeletonBodyText,
  Thumbnail
} from '@shopify/polaris';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";
import ProductModal from "./ProductModal";

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currentVariants, setCurrentVariants] = useState([])
  const productsPerPage = 10;
  const defaultImg = "https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"

  const alerts = useSelector(state => state.alerts);
  const threshold = useSelector((state) => state.threshold);

  const dispatch = useDispatch();

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  const getProducts = async () => {
    setIsLoading(true);
    axios.get(`https://storebuilder-backend.onrender.com/api/shopify/products`, {
      headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN
      }
    }).then(res => {
      const products = res.data.products.map((product) => {
        return {
          ...product,
          alertStatus: "pending"
        }
      });

      dispatch(actions.setAlerts(products.filter(product => product.total_inventory_quantity <= threshold)));

      setIsLoading(false);
    });
  }

  const handleAction = (id, status) => {
    dispatch(actions.setAlerts(alerts.map((alert) => alert.id === id ?
      {
        ...alert,
        alertStatus: status
      }
      :
      { ...alert }
    )));
  }

  const handleClick = (variants) => {
    setCurrentVariants(variants)
    setModalIsOpen(true)
  }

  const skeletonMarkup = (
    <IndexTable.Row>
      <IndexTable.Cell>
        <SkeletonBodyText />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <SkeletonBodyText />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <SkeletonBodyText />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <SkeletonBodyText />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <ButtonGroup>
          <SkeletonBodyText />
        </ButtonGroup>
      </IndexTable.Cell>
    </IndexTable.Row>
  )
  console.log(alerts);
  const rowMarkup = isLoading ? skeletonMarkup
    :
    modalIsOpen ?
      <ProductModal variants={currentVariants} setModalIsOpen={setModalIsOpen} />
      :
      (alerts.slice(startIndex, endIndex).map(
        ({ images, id, title, status, total_inventory_quantity, vendor, variants }, index) => (
          <IndexTable.Row selectable={true} id={id} key={id} position={index}>
            <IndexTable.Cell >
              <Thumbnail
                source={images[0] && images[0].src ? images[0].src : defaultImg}
              />
            </IndexTable.Cell>
            <IndexTable.Cell >{title}</IndexTable.Cell>
            <IndexTable.Cell>
              <Badge status={status === "active" ? "success" : "info"}>{status}</Badge>
            </IndexTable.Cell>
            <IndexTable.Cell>
              <Button plain monochrome removeUnderline onClick={() => handleClick(variants)}>
                <Text fontWeight="semibold" as="span" color="critical">
                  {total_inventory_quantity}</Text> <Text as="span"> in stock</Text>
              </Button>
            </IndexTable.Cell>
            <IndexTable.Cell>{vendor}</IndexTable.Cell>
            <IndexTable.Cell>
              <ButtonGroup>
                {alerts.map((product) => {
                  if (product.id === id) {
                    if (product.alertStatus === "pending") {
                      return (
                        <HorizontalStack key={id}>
                          <Box padding={1}>
                            <Button onClick={() => handleAction(id, "Acknowledged")} primarySuccess>
                              Acknowledge
                            </Button>
                          </Box>
                          <Box padding={1}>
                            <Button destructive onClick={() => handleAction(id, "Dismissed")}>Dismiss</Button>
                          </Box></HorizontalStack>
                      );
                    } else {
                      return <Box padding={1}>
                        <Text>
                          {product.alertStatus}
                        </Text>
                      </Box>;
                    }
                  }
                  return null;
                })}
              </ButtonGroup>
            </IndexTable.Cell>
          </IndexTable.Row>
        ),
      )
      );

  return (
    <Box width="100%" minHeight="100%" padding={6}>
      <LegacyCard>
        <HorizontalStack blockAlign="center" gap={2}>
          <Pagination
            hasPrevious={currentPage !== 1}
            hasNext={currentPage < Math.ceil(alerts.length / productsPerPage)}
            onNext={() => setCurrentPage((prevPage) => prevPage + 1)}
            onPrevious={() => setCurrentPage((prevPage) => prevPage - 1)}
          />
          <Text as="h3">{currentPage}/{Math.ceil(alerts.length / productsPerPage)}</Text>
        </HorizontalStack>
        <IndexTable
          itemCount={alerts.length}
          headings={[
            { title: "" },
            { title: 'Product' },
            { title: 'Status' },
            { title: 'Inventory Quantity' },
            { title: 'Vendor' },
            { title: 'Actions' },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    </Box>
  );
}

export default ProductList;
