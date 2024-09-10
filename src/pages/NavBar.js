import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ctlogo from "../assets/ct_logo.png";
import slideImg from "../assets/slide_img.jpg";
import aboutImg from "../assets/about-img.jpg";
import { Container } from "@mui/material";
import styles from "../virtuallabcss/NavBar.module.css";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact", "Login"];

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, px: 2, fontWeight: "700" }}>
        CAMPUS TECHNOLOGY
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ background: "none", color: "#aaa", backdropFilter: "blur(8px)" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <img
              src={ctlogo}
              alt="ct_logo"
              width="100"
              height="50"
              style={{
                objectFit: "cover",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
            CAMPUS TECHNOLOGY
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#aaa" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box sx={{ width: "100%" }}>
        <Box>
          <img
            src={slideImg}
            alt="slideImg"
            style={{
              width: "100%",
              height: "405px",
              objectFit: "cover",
              marginTop: "64px",
            }}
          />
        </Box>
        <Container>
          <Box
            component="main"
            sx={{ p: 2, backgroundColor: "#fff", color: "#0c0c0c" }}
          >
            <Toolbar />
            {/* img section here */}
            <Box
              component="main"
              sx={{ backgroundColor: "rgb(225, 245, 254)", mb: 2 }}
            >
              {/* <Typography variant="h2" textAlign="center">
                    Carousel
                </Typography> */}
              <img src={slideImg} alt="slideImg" style={{ width: "100%" }} />
            </Box>
            <Typography>
              The company itself is a very successful company. In the same way,
              where does his forgiveness run away from? Some of the bodies which
              we lead will receive some pain. For the distinction of choosing to
              bear with some, but what, accusers and shall I open? As for the
              exercise, but from following the ways chosen because we are
              corrupted in other ways, our distinction. A wise man must find a
              way out of pain and find some escape from his needs. But never to
              some, but the responsibilities of a wise man are more severe than
              those of the most corrupt. At certain times we accuse him of being
              relieved of the joys and pains of his pleasures; Or his sorrow for
              us, reasoned and resolved, escapes some who see this architect.
              For us, pleasure! And when, in choosing where something is less
              than who is blinded by the error of debt, he was chosen at the
              time of his exercise. Chosen by the wise, they provide for certain
              bodily pains, or the blessed must be repelled by the effort of
              rejecting any of those present, or the laborious manner in which
              she wishes to endure them! That's right. They do not know the
              advantages of corrupting anything, since nothing escapes the
              present pains of the architect's labors. What are the most
              objectionable? It will come to pass that the pain of trouble is
              spoken of by flattery, and his debts are furthered by desire; They
              fall in time, or please the pleasure of right labor, to be
              repelled by the happy, because whence there is something free from
              pain and trouble. By rejecting and similar exercise, may we please
              those who praise him! For in bearing no great error resolved, they
              provide that it repels with a similar desire itself, and at
              whatever time! He, by right, takes up the times from which things
              often come, except even with a just desire. He, the corrupt?
              Indeed, there is no escape from the accusers. The inventor of
              something useful will criticize the rejection of things! And it
              will happen that they should be rejected in other ways, and if
              there is nothing in the expedient, it hinders them, which they do
              not know themselves, to achieve any result worthy of them, but
              unless further from, he seeks the thing to be rejected. Having
              seen the pleasures, he prevents them from giving birth, for the
              pains of the free are easy for the inventor to bear, or the wise
              do not know the way.
            </Typography>
            <hr />
            {/* About page */}
            <Box>
              <img
                src={aboutImg}
                alt="about_img"
                className={styles.aboutImage}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  mb: 2,
                  color: "#444",
                  textShadow:
                    "1px 0px 1px #ccc, 0px 1px 1px #eee, 2px 1px 1px #ccc, 1px 2px 1px #eee, 3px 2px 1px #ccc, 2px 3px 1px #eee, 4px 3px 1px #ccc, 3px 4px 1px #eee, 5px 4px 1px #ccc, 4px 5px 1px #eee, 6px 5px 1px #ccc, 5px 6px 1px #eee, 7px 6px 1px #ccc;",
                }}
              >
                About Spering Company
              </Typography>
              <Typography sx={{ px: 6 }}>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If youThere are many variations of passages
                of Lorem Ipsum available, but the majority have suffered
                alteration in some form, by injected humour, or randomised words
                which don't look even slightly believable. If you
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button variant="contained" color="error" sx={{ my: 4 }}>
                  Read more
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavBar;
