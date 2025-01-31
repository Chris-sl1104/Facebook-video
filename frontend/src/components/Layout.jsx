import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Layout = ({ children }) => {
    return (
        <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
            {/* Top Navigation Bar */}
            <AppBar
                position="sticky"
                sx={{
                    top: 10,
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)", // Safari compatibility
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                    borderRadius: "16px",
                    width: "90%",
                    maxWidth: "1200px",
                    margin: "auto",
                }}
            >
                <Toolbar sx={{ minHeight: "64px", justifyContent: "center" }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            color: "#333",
                            letterSpacing: "1px",
                            textAlign: "center",
                        }}
                    >
                        🎬 StreamShark Video Player
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Render child components */}
            {children}
        </Box>
    );
};

export default Layout;
