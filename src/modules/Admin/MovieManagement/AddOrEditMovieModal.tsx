import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Radio, Row, Typography, Upload } from 'antd';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export interface FormValues {
  tenPhim: string;
  trailer: string;
  moTa: string;
  trangThai: boolean;
  hot: boolean;
  danhGia: string;
  ngayKhoiChieu: string;
  hinhAnh: any;
}

interface AddOrEditMovieModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  isPending: boolean;
  onSubmit: (formValues: FormValues) => void;
  dataEdit?: any;
}

const AddOrEditMovieModal: FC<AddOrEditMovieModalProps> = ({ isOpen, onCloseModal, isPending, dataEdit, onSubmit }) => {
  const { handleSubmit, control, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      trangThai: false,
      hot: false,
      danhGia: '',
      ngayKhoiChieu: '',
      hinhAnh: undefined,
    },
  });

  const watchHinhAnh = watch('hinhAnh');

  useEffect(() => {
    if (dataEdit) {
      setValue('tenPhim', dataEdit.tenPhim);
      setValue('tenPhim', dataEdit.tenPhim);
      setValue('tenPhim', dataEdit.tenPhim);
      setValue('tenPhim', dataEdit.tenPhim);
      setValue('tenPhim', dataEdit.tenPhim);
    }
  }, [dataEdit]);

  return (
    <Modal
      open={isOpen}
      title={<Typography className="text-2xl font-medium">{dataEdit ? 'Edit movie' : 'Add movie'}</Typography>}
      centered
      onCancel={onCloseModal}
      footer={false}
      width={700}
    >
      <Form className=" my-4 " onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 24]}>
          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Movie name
            </label>
            <Controller
              name="tenPhim"
              control={control}
              render={({ field }) => <Input {...field} size="large" placeholder="Movie name" className="mt-1" />}
            />
          </Col>
          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Trailer
            </label>
            <Controller
              name="trailer"
              control={control}
              render={({ field }) => <Input {...field} size="large" placeholder="Trailer" className="mt-1" />}
            />
          </Col>
          <Col span={24}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Description
            </label>
            <Controller
              name="moTa"
              control={control}
              render={({ field }) => (
                <Input.TextArea {...field} rows={4} size="large" placeholder="Description" className="mt-1" />
              )}
            />
          </Col>
          <Col span={24}>
            <label className="text-sm block">Status</label>
            <Controller
              name="trangThai"
              control={control}
              render={({ field }) => (
                <Radio.Group {...field} className="mt-1" defaultValue={false}>
                  <Radio value={true}>Showing</Radio>
                  <Radio value={false}>Coming soon</Radio>
                </Radio.Group>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              control={control}
              name="hot"
              render={({ field }) => (
                <Checkbox checked={field.value} {...field}>
                  Film hot
                </Checkbox>
              )}
            />
          </Col>
          <Col span={12}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Rate
            </label>
            <Controller
              control={control}
              name="danhGia"
              render={({ field }) => (
                <Input {...field} size="large" placeholder="Rate" type="number" className="mt-1" max={10} />
              )}
            />
          </Col>
          <Col span={12}>
            <label className="text-sm">
              <span className="text-red-600">*</span> Release date
            </label>
            <Controller
              name="ngayKhoiChieu"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  size="large"
                  className="mt-1 w-full"
                  placeholder="DD/MM/YYYY"
                  format={'DD/MM/YYYY'}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              control={control}
              name="hinhAnh"
              render={({ field: { onChange, ...field } }) => {
                return (
                  <Upload
                    {...field}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader relative w-fit"
                    showUploadList={false}
                    beforeUpload={() => {
                      return false;
                    }}
                    onChange={(info) => {
                      onChange(info.file);
                    }}
                  >
                    <button style={{ border: 0, background: 'none' }} type="button">
                      {watchHinhAnh ? (
                        <div>
                          <img
                            className="w-[60px] h-[80px] object-cover"
                            src={URL.createObjectURL(new Blob([watchHinhAnh]))}
                          />

                          <div
                            className="absolute top-2 right-2 cursor-pointer"
                            onClick={(event) => {
                              event.stopPropagation();
                              setValue('hinhAnh', undefined);
                            }}
                          >
                            <DeleteOutlined />
                          </div>
                        </div>
                      ) : (
                        <>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </>
                      )}
                    </button>
                  </Upload>
                );
              }}
            />
          </Col>
          <Col span={24} className="flex justify-end">
            <Button size="large" type="default">
              Cancel
            </Button>
            <Button
              loading={isPending}
              disabled={isPending}
              htmlType="submit"
              size="large"
              type="primary"
              className="ml-3"
            >
              Add movie
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddOrEditMovieModal;
