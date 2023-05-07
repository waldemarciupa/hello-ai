import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress } from '@mui/material';

export default function HelloApi() {
  const router = useRouter();
  const { pathname } = router;

  const getHelloApi = async () => {
    const response = await fetch('http://localhost:3000/api/helloapi');
    const result = await response.json();
    return result;
  };

  const { isLoading, data } = useQuery({
    queryKey: ['helloapi'],
    queryFn: getHelloApi,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  return (
    <div>
      <div>{pathname}</div>
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {data && <p>Answer message: {data.data}</p>}
    </div>
  );
}
