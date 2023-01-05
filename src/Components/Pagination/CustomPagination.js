import { createTheme, Pagination, ThemeProvider } from '@mui/material'
import React from 'react'

    const darkTheme = createTheme({
      palette: {
        mode: "dark",
      },
    });

const CustomPagination = ({setPage, numOfPages=10}) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    }

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop:10}}>
      <ThemeProvider theme={darkTheme}>
        <Pagination
          color="primary"
          hideNextButton
          hidePrevButton
          count={numOfPages}
          onChange={(event) => handlePageChange(event.target.textContent)}
        />
      </ThemeProvider>
    </div>
  );
}

export default CustomPagination