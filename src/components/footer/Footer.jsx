import "./footer.css";

function Footer() {
  return (
    <div className="footer_content">
      <div className="row">
        <div className="column">
          <div className="cl1">
            <img src={"/logo.png"} className="img" width="200px" height={42}></img>
            <br></br>
          </div>
        </div>

        <div className="column">
          <table className="table" style={{ color: "white" }}>
            <tbody>
              <tr>
                <td>
                  <h3>Về Travelago</h3>
                  <div style={{ height: "12px" }}></div>
                </td>
                <td>
                  <h3>Sản Phẩm</h3>
                  <div style={{ height: "12px" }}></div>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    Cách Đặt Chỗ
                  </a>
                </td>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    Vé Máy Bay
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    Liên Hệ Chúng Tôi
                  </a>
                </td>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    Khách Sạn
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    Trợ Giúp
                  </a>
                </td>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    Combo Tiết Kiệm
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    Tuyển Dụng
                  </a>
                </td>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    Experience
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    Về Chúng Tôi
                  </a>
                </td>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    Đưa Đón Sân Bay
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <h3>Theo Dõi Chúng Tôi Trên</h3>
                  <div style={{ height: "12px" }}></div>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    <img src={"/tiktok.svg"} width="20px"></img>TikTok
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    <img src={"/facebook.svg"} width="20px"></img>Facebook
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    <img src={"/instagram.svg"} width="20px"></img>Instagram
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <a href="https://travelago.vercel.app/" className="a">
                    <img src={"/youtube.svg"} width="20px"></img>Youtube
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="column">
          <div className="col3">
            <table className="">
              <tbody>
                <tr>
                  <td>
                    <h3>Khác</h3>
                    <div style={{ height: "12px" }}></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://travelago.vercel.app/" className="a">
                      Travelago Affilliate
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://travelago.vercel.app/" className="a">
                      Travelago Blog
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://travelago.vercel.app/" className="a">
                      Chính sách quyền riêng tư
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://travelago.vercel.app/" className="a">
                      Điều khoản Điều kiện
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://travelago.vercel.app/" className="a">
                      Quy chế hoạt động
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://travelago.vercel.app/" className="a">
                      Đăng ký nơi nghỉ của bạn
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://travelago.vercel.app/" className="a">
                      Đăng ký doanh nghiệp hoạt động du lịch của bạn
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://travelago.vercel.app/" className="a">
                      Khu vực báo chí
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="p">
        <p className="p2">Travelago Việt Nam. Hà Nội, Việt Nam</p>
        <p>Copyright &copy; 2024 Travelago</p>
      </div>
    </div>
  );
}

export default Footer;
