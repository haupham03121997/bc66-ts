import { ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Breadcrumb, Button, Pagination, Popconfirm, Rate, Table, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import { useState } from 'react';
import { movieApi } from '../../../apis/movie.api';
import { useListMovies } from '../../../hooks/useListMovies';
import { useOpenModal } from '../../../hooks/useOpenModal';
import { MovieItem } from '../../../interfaces/movie.interface';
import AddOrEditMovieModal, { FormValues } from './AddOrEditMovieModal';

const MovieManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, openModal, closeModal } = useOpenModal();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useListMovies(currentPage);

  // add movie
  const { mutate: handleAddMovieApi, isPending } = useMutation({
    mutationFn: (payload: any) => movieApi.addMovie(payload),
    onSuccess: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  // delete movie
  const { mutate: handleDeleteMovieApi, isPending: isDeleting } = useMutation({
    mutationFn: (idMovie: string) => movieApi.deleteMovie(idMovie),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['list-movies', { currentPage }],
        type: 'active',
      });
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const columns = [
    {
      title: 'Movie name',
      key: 'movie-name',
      dataIndex: 'tenPhim',
      width: 200,
    },
    {
      title: 'Image',
      key: 'image',
      render: (record: MovieItem) => {
        return <img src={record.hinhAnh} alt={record.biDanh} className="w-[100px] h-[120px] rounded-sm object-cover" />;
      },
    },
    {
      title: 'Description',
      key: 'description',
      render: (record: MovieItem) => {
        return (
          <Typography.Paragraph
            ellipsis={{
              rows: 2,
            }}
            className="w-[200px]"
          >
            {record.moTa}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: 'Show time',
      key: 'show-time',
      dataIndex: 'ngayKhoiChieu',
      render: (date: string) => {
        return <Typography>{format(date, 'dd/MM/yyyy hh:mm a')}</Typography>;
      },
    },
    {
      title: 'Rate',
      key: 'rate',
      dataIndex: 'danhGia',
      render: (rate: number) => {
        return <Rate disabled allowHalf value={(rate || 0) / 2} count={5} />;
      },
    },
    {
      title: 'Hot',
      key: 'hot',
      dataIndex: 'hot',
      render: (isHot: boolean) => {
        return isHot ? <Tag color="red">Hot 🔥 </Tag> : <Tag color="green">Normal</Tag>;
      },
    },
    {
      title: 'Showing',
      key: 'dangChieu',
      dataIndex: 'dangChieu',
      render: (isShowing: boolean) => {
        return isShowing ? (
          <Tag icon={<SyncOutlined spin />} color="processing">
            Showing
          </Tag>
        ) : (
          <Tag>N/A</Tag>
        );
      },
    },
    {
      title: 'Coming soon',
      key: 'sapChieu',
      dataIndex: 'sapChieu',
      render: (isComingSoon: boolean) => {
        return isComingSoon ? (
          <Tag color="success" icon={<ClockCircleOutlined />}>
            Coming soon
          </Tag>
        ) : (
          <Tag>N/A</Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => {
        return (
          <div className="flex">
            <Button type="primary" className="mr-2" onClick={() => alert(record.maPhim)}>
              Edit
            </Button>
            <Popconfirm
              title="Delete the movie"
              description="Are you sure to delete this movie?"
              onConfirm={() => handleDeleteMovieApi(record.maPhim)}
              onCancel={() => {}}
              placement="bottom"
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger disabled={isDeleting}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const dataSource = data?.items || [];
  const total = data?.totalCount || 0;

  const handleSubmit = (formValues: FormValues) => {
    console.log('formValues', formValues);
    const formData = new FormData();
    formData.append('tenPhim', formValues.tenPhim);
    formData.append('trailer', formValues.trailer);
    formData.append('danhGia', formValues.danhGia);
    formData.append('moTa', formValues.moTa);
    formData.append('hinhAnh', formValues.hinhAnh);
    formData.append('hot', formValues.hot.toString());
    formData.append('dangChieu', formValues.trangThai ? 'true' : 'false');
    formData.append('sapChieu', formValues.trangThai ? 'false' : 'true');
    formData.append('ngayKhoiChieu', '23/07/2024');
    formData.append('maNhom', 'GP01');
    handleAddMovieApi(formData);
  };

  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'Dashboard',
            },
            {
              title: 'Movie Management',
              href: '',
            },
          ]}
        />

        <Button size="large" type="primary" onClick={openModal}>
          Add Movie
        </Button>
      </div>
      <h3 className="font-medium text-2xl mb-3">List movies</h3>
      <Table rowKey="maPhim" columns={columns} dataSource={dataSource} pagination={false} loading={isLoading} />
      <div className="flex justify-end mt-10">
        <Pagination
          total={total}
          defaultCurrent={1}
          onChange={(page: number, pSize: number) => {
            setCurrentPage(page);
          }}
          showSizeChanger={false}
        />
      </div>

      <AddOrEditMovieModal
        dataEdit={undefined}
        isOpen={isOpen}
        isPending={isPending}
        onCloseModal={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default MovieManagement;
