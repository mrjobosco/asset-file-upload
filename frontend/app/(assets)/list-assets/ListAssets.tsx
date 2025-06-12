import { Modal, PageLoading } from "@/components";
import { UseFetchAssetsReturn } from "./useFetchAssets";
import { ListAssetsTable } from "./ListAssetsTable";
import { SearchAssets } from "./SearchAssets";

type ListAssetsProps = UseFetchAssetsReturn & {
  isOpen: boolean;
  closeModal: () => void;
}

export function ListAssets(props: ListAssetsProps): React.ReactElement {
  const { isOpen, closeModal, loading, error, assets, fetchAssets } = props;

  if (loading) {
    return (
      <PageLoading />
    )
  }

  return (
    <>
      <ListAssetsTable assets={assets} />
      <Modal isOpen={isOpen} onClose={closeModal} title="Search Assets">
        <div className="flex flex-col gap-4 min-w-[300px] max-w-[500px]">
          <small className="text-red-500">{error}</small>
          <SearchAssets
            fetchAssets={fetchAssets}
            loading={loading}
          />
        </div>
      </Modal>
    </>
  );
}