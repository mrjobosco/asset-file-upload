"use client";
import { Button, Modal, useModalState } from "@/components";
import { UploadAssetForm } from "./(assets)/assets-form/AssetsForm";
import { ListAssets } from "./(assets)/list-assets/ListAssets";
import { useFetchAssets } from "./(assets)/list-assets/useFetchAssets";


export default function Home(): React.ReactElement {
  const {
    isOpen: isAssetFormOpen,
    open: openAssetFormModal,
    close: closeAssetFormModal
  } = useModalState();

  const {
    fetchAssets,
    loading,
    error,
    assets
  } = useFetchAssets();

  const {
    isOpen: isSearchModalOpen,
    open: openSearchModal,
    close: closeSearchModal
  } = useModalState();

  return (
    <main className="flex flex-col min-h-screen p-4 gap-4">
      <div className="flex items-center justify-end gap-4">
        <Button onClick={openSearchModal}>Search Assets</Button>
        <Button onClick={() => fetchAssets()}>Refresh List</Button>
        <Button onClick={openAssetFormModal}>Upload Asset</Button>
      </div>
      <ListAssets
        isOpen={isSearchModalOpen}
        closeModal={closeSearchModal}
        loading={loading}
        error={error}
        assets={assets}
        fetchAssets={fetchAssets}
      />
      <Modal isOpen={isAssetFormOpen} onClose={closeAssetFormModal} title="Upload Asset">
        <UploadAssetForm onFormSuccessfullySubmitted={() => {
          closeAssetFormModal();
          fetchAssets();
        }} />
      </Modal>
    </main>
  );
}
