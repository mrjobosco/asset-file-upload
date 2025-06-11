import { Asset } from "@/types/assets";
import React from "react";

type ListAssetsProps = {
  assets: Asset[];
};

export function ListAssetsTable(props: ListAssetsProps): React.ReactElement {
  const { assets } = props;

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Latitude</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Longitude</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset, idx) => (
          <tr key={idx}>
            <td className="border border-gray-300 px-4 py-2">{asset.address}</td>
            <td className="border border-gray-300 px-4 py-2">{asset.latitude}</td>
            <td className="border border-gray-300 px-4 py-2">{asset.longitude}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}