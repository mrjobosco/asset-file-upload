import { Button, Input } from "@/components";
import { useState } from "react";

export interface SearchAssetsInterface {
  loading: boolean;
  fetchAssets: (companyId: string) => void
}

export function SearchAssets(props: SearchAssetsInterface): React.ReactElement {
  const [companyId, setCompanyId] = useState<string>("");
  const { loading, fetchAssets } = props;

  return (
    <div>
      <Input placeholder="Search by Company Id" onChange={(e) => setCompanyId(e.target.value)} />
      <Button onClick={() => fetchAssets(companyId)} disabled={!companyId || loading}>
        {loading ? 'Loading' : 'Search'}
      </Button>
    </div>
  );
}