import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import Reason from "../../components/uiHomepage/Reason";
import Discover from '../../components/uiHomepage/Discover';

function HomePage() {
  return (
    <>
      <div className="homePage">
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">Đi khắp Việt Nam, Trong Tầm Tay Bạn</h1>
            <p>Tìm & đặt phòng khách sạn giá rẻ chỉ với 3 bước đơn giản!</p>
            <SearchBar />
            {/* <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>
              <div className="box">
                <h1>200</h1>
                <h2>Award Gained</h2>
              </div>
              <div className="box">
                <h1>2000+</h1>
                <h2>Property Ready</h2>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div style={{height:"128px"}}></div>
      <Reason></Reason>
      <Discover></Discover>
    </>
  );
}

export default HomePage;
