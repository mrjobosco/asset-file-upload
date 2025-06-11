import { PageLoading } from "@/components";
import { useFetchAssets } from "./useFetchAssets";
import { ListAssetsTable } from "./ListAssetsTable";


export function ListAsset(): React.ReactElement {
  const {
    loading,
    assets
  } = useFetchAssets();

  if (loading) {
    return (
      <PageLoading />
    )
  }

  return (
    <>
      <ListAssetsTable assets={assets} />
    </>
  );
}