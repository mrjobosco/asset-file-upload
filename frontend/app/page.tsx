"use client";
import { Button, Modal, useModalState } from "@/components";
import { UploadAssetForm } from "./(assets)/assets-form/AssetsForm";
import { ListAsset } from "./(assets)/list-assets/ListAssets";


export default function Home(): React.ReactElement {
  const {
    isOpen: isAssetFormOpen,
    open: openAssetFormModal,
    close: closeAssetFormModal
  } = useModalState();

  return (
    <main className="flex flex-col min-h-screen p-4 gap-4">
      <div className="flex items-center justify-end gap-4">
        <Button onClick={openAssetFormModal}>Upload Asset</Button>
      </div>
      <ListAsset />
      <Modal isOpen={isAssetFormOpen} onClose={closeAssetFormModal} title="Upload Asset">
        <UploadAssetForm onFormSuccessfullySubmitted={() => {
          closeAssetFormModal();
        }} />
      </Modal>
    </main>
  );
}
