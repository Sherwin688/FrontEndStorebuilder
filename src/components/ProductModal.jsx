import {  Modal, LegacyCard, DataTable } from '@shopify/polaris';

const ProductModal = ({ variants, setModalIsOpen }) => {
  const rows = variants.map(product => [product.title, product.inventory_quantity])

  return (
    <div style={{ height: '500px' }}>
      <Modal
        large
        open={true}
        onClose={() => setModalIsOpen(false)}
        title="Variants"
        primaryAction={{
        content: 'close',
        onAction: () => setModalIsOpen(false),
        }}
      >
        <Modal.Section>
          <LegacyCard>
            <DataTable
              columnContentTypes={[
                'text',
                'text'
              ]}
              headings={[
                'Product',
                'Inventory Quantity'
              ]}
              rows={rows}
            />
          </LegacyCard>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default ProductModal