import { uploadAssets } from "@/services/assets.api";
import { useState } from "react";
import { useForm } from "react-hook-form"

interface AssetFormValues {
  companyId: string;
  assetFile: FileList;
}

interface UseAssetFormReturn {
  methods: ReturnType<typeof useForm<AssetFormValues>>;
  onSubmit: (data: AssetFormValues) => void;
  resetForm: () => void;
  isUploading: boolean;
  error: string | null;
}

interface UseAssetFormProps {
  onFormSuccessfullySubmitted: () => void;
}

export function useAssetsForm(props: UseAssetFormProps): UseAssetFormReturn {
  const { onFormSuccessfullySubmitted } = props;
  const methods = useForm<AssetFormValues>();

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: AssetFormValues): Promise<void> => {
    setIsUploading(true);
    setError('');
    const formData = new FormData();
    formData.append("companyId", data.companyId);
    formData.append("assetFile", data.assetFile.item(0) as File);

    try {
      await uploadAssets(formData);

      alert('Uploaded successfully!');
      methods.reset();
      onFormSuccessfullySubmitted();
    } catch (error: unknown) {

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to upload asset");
      }

    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = (): void => {
    methods.reset({
      companyId: "",
    });
  };

  return {
    methods,
    onSubmit,
    resetForm,
    isUploading,
    error,
  };
}