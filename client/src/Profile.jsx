import React, { useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./profile.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = () => {
  const { userData, isLoggedIn } = React.useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/meme");
    }
  }, []);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{userData && userData.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {userData && (
              <img
                src={`http://localhost:5000/${userData.profilePhotoUrl}`}
                alt="Avatar"
                class="img-fluid my-5"
              />
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <section class="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-6 mb-4 mb-lg-0">
              <div class="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div class="row g-0">
                  <div
                    class="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <Button
                      style={{ borderRadius: "50%" }}
                      onClick={handleClickOpen}
                    >
                      {userData && (
                        <img
                          src={`http://localhost:5000/${userData.profilePhotoUrl}`}
                          alt="Avatar"
                          class="img-fluid my-5"
                          style={{ borderRadius: "50%" }}
                        />
                      )}
                    </Button>
                    <h5>{userData && userData.name}</h5>
                    <p>Web Designer</p>
                    <i class="far fa-edit mb-5"></i>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body p-4">
                      <h6>Information</h6>
                      <hr class="mt-0 mb-4" />
                      <div class="row pt-1">
                        <div class="col-12 mb-3">
                          <h6>Email</h6>
                          <p class="text-muted">{userData && userData.email}</p>
                        </div>
                        <div class="col-6 mb-3">
                          <h6>Username</h6>
                          <p class="text-muted">
                            {userData && userData.username}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
