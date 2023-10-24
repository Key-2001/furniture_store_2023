/* eslint-disable react/prop-types */
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { Fragment, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UploadCloudinaryService } from "../../../../services/UploadCloudinaryService";
import HashLoader from "react-spinners/HashLoader";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImages = (props) => {
  //! Props
  const { fileList, setFileList } = props;
  //! State
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const mutateUpload = useMutation({
    mutationFn: (file) => UploadCloudinaryService(file),
  });
  //! Function
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleAction = async (file) => {
    try {
      const data = await mutateUpload.mutateAsync(file);
      setFileList((prev) => {
        return [
          ...prev,
          {
            uid: data.asset_id,
            name: data.original_filename,
            status: "done",
            url: data.url,
          },
        ];
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = (file) => {
    const files = fileList.filter((el) => el?.uid !== file.uid);
    setFileList(files);
  };
  //! Effect

  //! Render
  const uploadButton = (
    <div>
      {mutateUpload.isLoading ? (
        <HashLoader size={28} color="#ab7a5f" />
      ) : (
        <Fragment>
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </Fragment>
      )}
    </div>
  );
  return (
    <Fragment>
      <Upload
        action={handleAction}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={handleRemove}
        // onChange={handleChange}
      >
        {fileList.length > 5 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </Fragment>
  );
};

export default UploadImages;
