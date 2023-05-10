import React, { memo } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress } from '@mui/material';
import { getData } from '@/utils';

type PageProps = {};

const Page = (props: PageProps) => {
  const {
    query: { slug },
  } = useRouter();

  const { isLoading, data } = useQuery({
    queryKey: ['data', slug],
    queryFn: () => getData(slug),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <div>
      <div>{slug}</div>
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {data && <p>Answer message: {data.data}</p>}
    </div>
  );
};

export default memo(Page);
