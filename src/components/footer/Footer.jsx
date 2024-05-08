import { Link, useLocation } from "react-router-dom";

import { PATH_URL, TRAVELAGO } from "../../utils/const/common";
import "./footer.css";
import { useEffect } from "react";

function Footer() {
  const table = [
    {
      about: {
        text: "Về " + TRAVELAGO,
      },
      product: {
        text: "Sản Phẩm",
      },
    },
    {
      about: {
        text: "Cách Đặt Chỗ",
        link: "",
      },
      product: {
        text: "Vé Máy Bay",
        link: "",
      },
    },
    {
      about: {
        text: "Liên Hệ Chúng Tôi",
        link: "",
      },
      product: {
        text: "Khách Sạn",
        link: "",
      },
    },
    {
      about: {
        text: "Trợ Giúp",
        link: "",
      },
      product: {
        text: "Combo Tiết Kiệm",
        link: "",
      },
    },
    {
      about: {
        text: "Tuyển Dụng",
        link: "",
      },
      product: {
        text: "Experience",
        link: "",
      },
    },
    {
      about: {
        text: "Về Chúng Tôi",
        link: PATH_URL.ABOUT,
      },
      product: {
        text: "Đưa Đón Sân Bay",
        link: "",
      },
    },
  ];
  const socials = [
    {
      text: "Theo Dõi Chúng Tôi Trên",
    },
    {
      text: "TikTok",
      img: "/tiktok.svg",
      link: "",
    },
    {
      text: "Facebook",
      img: "/facebook.svg",
      link: "",
    },
    {
      text: "Instagram",
      img: "/instagram.svg",
      link: "",
    },
    {
      text: "Youtube",
      img: "/youtube.svg",
      link: "",
    },
  ];
  const others = [
    {
      text: "Khác",
    },
    {
      text: "Travelago Affilliate",
      link: "",
    },
    {
      text: "Travelago Blog",
      link: "",
    },
    {
      text: "Chính sách quyền riêng tư",
      link: PATH_URL.PRIVACY_POLICY,
    },
    {
      text: "Điều khoản Điều kiện",
      link: PATH_URL.TERMS_AND_CONDITIONS,
    },
    {
      text: "Quy chế hoạt động",
      link: "",
    },
    {
      text: "Đăng ký nơi nghỉ của bạn",
      link: "",
    },
    {
      text: "Đăng ký doanh nghiệp hoạt động du lịch của bạn",
      link: "",
    },
    {
      text: "Khu vực báo chí",
      link: "",
    },
  ];

  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="footer_content">
      <div className="row">
        <div className="column">
          <div className="cl1">
            <img
              src={"/logo.png"}
              className="img"
              width="200px"
              height={42}
            ></img>
            <br></br>
          </div>
        </div>

        <div className="column">
          <table className="table" style={{ color: "white" }}>
            <tbody>
              {table.map((item, index) =>
                !index ? (
                  <tr key={index}>
                    <td>
                      <h3 className="mb-3">{item.about.text}</h3>
                    </td>
                    <td>
                      <h3 className="mb-3">{item.product.text}</h3>
                    </td>
                  </tr>
                ) : (
                  <tr key={index}>
                    <td>
                      <Link to={item.about.link} className="a">
                        {item.about.text}
                      </Link>
                    </td>
                    <td>
                      <Link to={item.product.link} className="a">
                        {item.product.text}
                      </Link>
                    </td>
                  </tr>
                )
              )}

              {socials.map((item, index) =>
                !index ? (
                  <tr key={index}>
                    <td>
                      <h3 className="mb-3">{item.text}</h3>
                    </td>
                  </tr>
                ) : (
                  <tr key={index}>
                    <td>
                      <Link to={item.link} className="a">
                        <img src={item.img} alt={item.text} width="20px"></img>
                        {item.text}
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="column">
          <div className="col3">
            <table className="">
              <tbody>
                {others.map((item, index) =>
                  !index ? (
                    <tr key={index}>
                      <td>
                        <h3 className="mb-3">{item.text}</h3>
                      </td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <td>
                        <Link to={item.link} className="a">
                          {item.text}
                        </Link>
                      </td>
                    </tr>
                  )
                )}
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
