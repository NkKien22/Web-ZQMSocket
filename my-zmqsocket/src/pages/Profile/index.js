import "../Profile/profile.css";
const Profile = () => {
    return (
    <div className="container emp-profile">
                <form method="post">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-img">
                                <img src="https://lh3.googleusercontent.com/pw/AL9nZEXSp-i80sBxkUZBBFujsWqLg6MYf_FQaljlzJljr0Npj6GihN5eszHCly0wrSb5wFQHYgf3vtMmRyzgs1KuJaYCPo4XqGxeZdByrdO1R1nyKdoMyIxXK0ybwKrt8LiY3iN8KiXt4HROoU8bLSPlhkQiKMddIWJEFLmL6I2agqXUd5cPbOJaRrTXWJGdVu0zkD4W1xAG9r3zSIV1Yf_1zmRxb0SYTwc8ZP6d_NOxYgVH9NQx4vK0F-H_uGUGGhSqOtTmfihJZ1Ij4yGKTatYwifPhdhNZAljhMi0wpE0_UWCszMexb2NuSp19HnpfgWXOPSbRDywPS-NZW6W5jiVxtBdNfrxCJ1emsI1bKA3QYnDy7oT7FtB2k70aGoP5QXXwoy7nZ_qMly7a4azCn7BKk556U3yJhOBFgdwqyKMp82szqy5AUrz5vNk3yDhJc_Dy_-GCTWxdiKfguMrNvDhXto8bLExwDAgGrW6SCwZTtCdTFYmPo-15sDaHKj0c9HAQsxn8jQcws4b0LHEzvT9dkGYAdrIyMNpU5IE9Rham2rC7t47afnT--K9vZv-EnuOpZvUeCMlBvT15i2JUSXb6qyCrp2ulZBt2TMRrzgyI_Y18euzMQM67GcZETN7ypatW7K2THaeZ7wv42P1uI7XkJWLZ8492UUefxxFW7NoFWJu0GRPyxJ41RjjtxposFmWHO-fnruEwZ4BFxU0hoC5yx16nYsWKpL-qCJ6mOhFcUUtoaXQ-YU2wdQLEHP19y6m_vodZVq0L4yMsJzi83SJY49IpgOZ1p8ukWg-aKyFiXkXmKHUzqhKjOWRqXzKO4zxGH64DUlc5ERk3X9cnSXekpwhcVoG1BI7RJYaOpgRvpnUm8-_8RzqJaU8XUppshmV3Ul_n-XtF2N5WJyOAKsxAEZPuPDoY12ALRifEuSjQ7AmlPmI8cpacLaKtJOyqqZmw_ltKA5XzZsuggqD02c6jMonOjj8ew=s500-no?authuser=1" alt=""/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="profile-head">
                                        <h5>
                                            Kshiti Ghelani
                                        </h5>
                                        <h6>
                                            Web Developer and Designer
                                        </h6>
                                        <p class="proile-rating">RANKINGS : <span>8/10</span></p>
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <input type={"button"} class="profile-edit-btn" name="btnAddMore" value="Sửa thông tin"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-work">
                                <p>WORK LINK</p>
                                <a href="">Website Link</a><br/>
                                <a href="">Bootsnipp Profile</a><br/>
                                <a href="">Bootply Profile</a>
                                <p>SKILLS</p>
                                <a href="">Web Designer</a><br/>
                                <a href="">Web Developer</a><br/>
                                <a href="">WordPress</a><br/>
                                <a href="">WooCommerce</a><br/>
                                <a href="">PHP, .Net</a><br/>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="tab-content profile-tab" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>User Id</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>Kshiti123</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Name</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>Kshiti Ghelani</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Email</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>kshitighelani@gmail.com</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Phone</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>123 456 7890</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Profession</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>Web Developer and Designer</p>
                                                </div>
                                            </div>
                                </div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Experience</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>Expert</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Hourly Rate</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>10$/hr</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Total Projects</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>230</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>English Level</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>Expert</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Availability</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <p>6 months</p>
                                                </div>
                                            </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label>Your Bio</label><br/>
                                            <p>Your detail description</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>           
            </div>
    )
  };
  
  export default Profile;
  