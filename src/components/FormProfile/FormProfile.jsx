import { LinkOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  List,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { Suspense, useCallback, useState } from "react";

import MessageAPIHelper from "../../helpers/toast-message.helper";
import { editUser } from "../../utils/api";
import Avatar from "../base/avatar/Avatar";
import Loading from "./Loading";
import styles from "./profile.module.css";

const userRepository = "";

const GENERAL_INFORMATION = {
  fullName: {
    label: "Họ và tên",
    type: "text",
    fieldProps: {},
    formItemProps: {
      rules: [
        { required: true, message: "Yêu cầu nhập họ tên" },
        { min: 6, message: "Yêu cầu nhập tối thiểu 6 ký tự" },
        { max: 30, message: "Yêu cầu không nhập quá 30 ký tự" },
      ],
    },
  },
  email: {
    label: "E-mail",
    type: "text",
    fieldProps: {
      readOnly: true,
    },
    formItemProps: {},
  },
  dob: {
    label: "Ngày sinh",
    type: "date",
    fieldProps: {},
    formItemProps: {
      rules: [
        {
          required: true,
          message: "Yêu cầu nhập ngày sinh",
        },
        () => ({
          validator(value) {
            if (!value || new Date(value) < new Date("2005-01-01")) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Yêu cầu nhập đúng tuổi"));
          },
        }),
      ],
    },
  },
  phone: {
    label: "Số điện thoại",
    type: "text",
    fieldProps: {},
    formItemProps: {
      rules: [
        () => ({
          validator(value) {
            return Promise.resolve();
            if (!value || /(0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Yêu cầu nhập đúng số điện thoại"));
          },
        }),
      ],
    },
  },
  address: {
    label: "Địa chỉ",
    type: "text",
    fieldProps: {},
    formItemProps: {
      rules: [{ max: 100, message: "Yêu cầu không nhập quá 100 ký tự" }],
    },
  },
};

async function sendOTP(email, action) {
  return await userRepository.sendOTP(email, action);
}

function MainCard({
  isEditable,
  generalInfo,
  toggleEditable,
  handleToast,
  userData,
}) {
  const [previewInfo, setPreviewInfo] = useState({
    openModal: false,
    src: generalInfo.avatar || "./image/doge.jpg",
    title: "Ảnh đại diện",
  });
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "Avatar",
      status: "done",
      url: generalInfo.avatar || "./image/doge.jpg",
    },
  ]);

  const handleClosePreview = useCallback(
    () => setPreviewInfo((pre) => ({ ...pre, openModal: false })),
    []
  );

  const handlePreview = useCallback((file) => {
    setPreviewInfo({
      openModal: true,
      src: file?.url || "./image/doge.jpg",
      title: file?.name || "Ảnh đại diện",
    });
  }, []);

  const handleChangeFile = useCallback(
    async (files) => {
      const { file } = files;

      if (file) generalInfo.avatarFile = file;

      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        handleToast(MessageAPIHelper.error("Đừng có mà upload linh tinh"));
        return;
      }

      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        handleToast(
          MessageAPIHelper.error("Không upload được ảnh lớn hơn 10MB!")
        );
        return;
      }

      const base64 = await toBase64(file.originFileObj);
      setFileList([
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: base64,
        },
      ]);
    },
    [handleToast, generalInfo]
  );

  return (
    <Card style={{ textAlign: "center" }}>
      <Space size={10} direction="vertical">
        {/* <Upload
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChangeFile}
          className={"upload-avatar"}
          customRequest={({ file, onSuccess }) => {
            setTimeout(async () => {
              if (onSuccess) {
                onSuccess("ok");
              }
            }, 0);
          }}
        >
          {isEditable
            ? (<div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>)
            : null
          }
        </Upload> */}

        <Avatar
          name={userData?.fullName ? userData?.fullName : ""}
          width={64}
          height={64}
        ></Avatar>

        <Typography.Title level={4}>{generalInfo.fullName}</Typography.Title>
        {isEditable ? (
          <Space>
            <Button type="primary" htmlType="submit">
              Lưu thông tin
            </Button>
            <Button onClick={toggleEditable}>Hủy</Button>
          </Space>
        ) : (
          <Button onClick={toggleEditable}>Chỉnh sửa thông tin</Button>
        )}
      </Space>
    </Card>
  );
}

function SocialCard({ socialLinks, isEditable, onAddSocialLinks, userData }) {
  return (
    <Card title={userData?.fullName ? userData?.fullName : ""}>
      <List
        className={styles.list}
        dataSource={socialLinks}
        renderItem={(item, index) => {
          return (
            <SocialLinkItem isEditable={isEditable} item={item} index={index} />
          );
        }}
      />
      {isEditable && socialLinks.length < 20 ? (
        <Flex justify="center">
          <Button
            type="link"
            icon={<PlusOutlined />}
            onClick={onAddSocialLinks}
          >
            Thêm liên kết
          </Button>
        </Flex>
      ) : null}
    </Card>
  );
}

function SocialLinkItem({ isEditable, item, index }) {
  const handleCopy = () => {
    if (item) {
      if ("clipboard" in navigator) {
        navigator.clipboard.writeText(item);
      } else {
        document.execCommand("copy", true, item);
      }
      message.success("Đã copy đường dẫn");
    }
  };
  return (
    <List.Item>
      {isEditable ? (
        <>
          <LinkOutlined />
          <Form.Item
            style={{ margin: "0 0 0 10px", width: "100%" }}
            validateTrigger="onBlur"
            name={`social_${index}`}
            rules={[
              () => ({
                validator(_, value) {
                  if (
                    !value ||
                    value.match(
                      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
                    )
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Yêu cầu nhập đúng định dạng url")
                  );
                },
              }),
              {
                max: 100,
                message: "Đường dẫn gì mà dài thế. Dùng rút gọn link đi",
              },
            ]}
          >
            <Input placeholder="Url..." />
          </Form.Item>
        </>
      ) : (
        <Space>
          <LinkOutlined />
          <Typography.Paragraph
            ellipsis={true}
            className={styles.paragraph}
            style={{ cursor: `${item ? "copy" : "initial"}` }}
            onClick={handleCopy}
          >
            {item?.length ? item : "Chưa thêm liên kết"}
          </Typography.Paragraph>
        </Space>
      )}
    </List.Item>
  );
}

function InformationCard({ generalInfo, isEditable }) {
  return (
    <Card title="Giới thiệu" style={{ width: "100%" }}>
      <List
        className={styles.list}
        dataSource={Object.entries(generalInfo)}
        renderItem={([key, value]) => {
          const field = GENERAL_INFORMATION[key];
          if (!field) return null;

          let FieldComponent;
          if (field.type === "date") {
            FieldComponent = <DatePicker />;
          } else {
            FieldComponent = (
              <Input
                addonBefore={key === "phone" ? "+84" : ""}
                {...field.fieldProps}
              />
            );
          }

          return (
            <List.Item>
              {isEditable ? (
                <>
                  <Typography.Text strong className={styles.infomationTitle}>
                    {field.label}
                  </Typography.Text>
                  <Form.Item
                    validateTrigger="onBlur"
                    style={{ marginBottom: 0, width: "100%" }}
                    name={key}
                    {...field.formItemProps}
                  >
                    {FieldComponent}
                  </Form.Item>
                </>
              ) : (
                <Space size={"middle"}>
                  <Typography.Title
                    level={5}
                    className={styles.infomationTitle}
                  >
                    {field.label}
                  </Typography.Title>
                  <Typography.Paragraph
                    ellipsis={true}
                    className={styles.infomationValue}
                    type="secondary"
                  >
                    {value ? value : "Chưa có"}
                  </Typography.Paragraph>
                </Space>
              )}
            </List.Item>
          );
        }}
      ></List>
    </Card>
  );
}

export default function FormProfile({ userData }) {
  const { data: session, update } = "";
  const [messageApi, contextHolder] = message.useMessage();

  const [isEditable, setIsEditable] = useState(false);
  const [generalInfo, setGeneralInfo] = useState({
    fullName: userData.fullName,
    email: userData.email,
    title: userData.title,
    phone: userData.phoneNumber ?? "",
    address: userData.address ?? "",
    avatar: userData.avatar ?? "",
    avatarFile: undefined,
  });
  const [socialLinks, setSocialLinks] = useState(
    userData.socials?.length ? userData.socials : [""]
  );
  const [verifyEmail, setVerifyEmail] = useState(userData.verifyEmail ?? false);
  const [openModalOTP, setOpenModalOTP] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleToast = useCallback(
    (value) => messageApi.open({ ...value }),
    [messageApi]
  );

  const toggleEditable = useCallback(() => setIsEditable((prev) => !prev), []);

  const handleAddSocialLinks = useCallback(
    () => setSocialLinks((prev) => [...prev, ""]),
    []
  );

  const handleVerifyEmail = useCallback(async (email, action, otp) => {
    return await userRepository.verifyEmail(email, action, otp);
  }, []);

  const handleSendOTP = useCallback(async () => {
    setIsFetching(true);
    const resSendOTP = await sendOTP(generalInfo.email, ACTIONS.VERIFY_EMAIL);
    if (resSendOTP.statusCode !== 200 || !resSendOTP.success) {
      setIsFetching(false);
      handleToast(
        MessageAPIHelper.error("Đang xảy ra lỗi. Hãy thử lại sau nhé!")
      );
      return;
    }

    handleToast(
      MessageAPIHelper.success("Mã xác thực đã được gửi. Check mail nha!")
    );
    setOpenModalOTP(true);
    setIsFetching(false);
  }, [generalInfo, handleToast]);

  const handleCloseModalOTP = useCallback(() => setOpenModalOTP(false), []);

  const handleSendOTPAgain = useCallback(
    async (email) => {
      const resSendOTP = await sendOTP(email, ACTIONS.VERIFY_EMAIL);
      if (resSendOTP.statusCode !== 200 || !resSendOTP.success) {
        handleToast(MessageAPIHelper.error("Lỗi rồi. Không gửi lại được?"));
        return;
      }

      handleToast(
        MessageAPIHelper.success("Mã xác thực đã được gửi lại. Check mail nha!")
      );
    },
    [handleToast]
  );

  const onFinish = async (values) => {
    const infoData = {
      fullName: values.fullName,
      phone: values.phone,
      address: values.address,
    };

    //handleToast(MessageAPIHelper.loading("Đang cập nhật thông tin cá nhân..."));

    // if (generalInfo?.avatarFile) {
    //   const response = await userRepository.uploadAvatar(generalInfo?.avatarFile, userData._id, session?.user.accessToken.token);

    //   if (response.status !== 200 || !response?.data?.payload) {
    //     handleToast(MessageAPIHelper.error('Cập nhật ảnh đại diện thất bại!'));
    //     return;
    //   }

    //   await handleToast(MessageAPIHelper.success('Cập nhật ảnh đại diện thành công'));
    //   const { url } = response?.data?.payload;
    //   // reset file
    //   setGeneralInfo((pre) => ({
    //     ...pre,
    //     avatar: url,
    //     avatarFile: undefined
    //   }));
    // }

    // await userRepository
    //   .editProfile(userData._id, {
    //     ...infoData,
    //     dob: new Date(values.dob.$d).toISOString(),
    //     socials: socials,
    //   })
    //   .then((res) => {
    //     if (res.message) {
    //       setSocialLinks(socials.length ? socials : [""]);
    //       setGeneralInfo({
    //         ...generalInfo,
    //         ...infoData,
    //         dob: dayjs(values.dob.$d).format("DD/MM/YYYY"),
    //       });
    //       update({ fullName: infoData.fullName });
    //       toggleEditable();
    //       handleToast(MessageAPIHelper.success('Cập nhật thông tin cá nhân thành công!'));
    //     }
    //   })
    //   .catch((e) => {
    //     handleToast(MessageAPIHelper.error('Cập nhật thông tin cá nhân thất bại!'));
    //   });

    try {
      const res = await editUser(infoData);
      if (res.data.id) {
        setGeneralInfo({
          ...generalInfo,
          ...infoData,
        });
        toggleEditable();
      }
      handleToast(
        MessageAPIHelper.success("Cập nhật thông tin cá nhân thành công!")
      );
    } catch (e) {
      handleToast(
        MessageAPIHelper.error("Cập nhật thông tin cá nhân thất bại!")
      );
      console.log(e);
    }
  };

  console.log(userData);
  return (
    <Suspense fallback={<Loading />}>
      {contextHolder}
      {/* {!verifyEmail
        ? <Alert
          message="Email chưa xác thực!"
          description="Hãy xác thực email của bạn để có thể sử dụng các dịch vụ khác nha!"
          type="warning"
          action={
            <Space direction="vertical">
              <Button size="small" onClick={handleSendOTP} loading={isFetching}>
                Verify Now
              </Button>
            </Space>
          }
        />
        : null
      } */}

      {/* <ModalOTP
        title={"Xác thực OTP"}
        email={generalInfo.email}
        openModalOTP={openModalOTP}
        onCancel={handleCloseModalOTP}
        onOk={handleVerifyEmail}
        handleSendOTPAgain={handleSendOTPAgain}
        setVerifyEmail={setVerifyEmail}
        textOk={"Xác thực"}
        action={ACTIONS.VERIFY_EMAIL}
        handleToast={handleToast}
      /> */}

      <Form
        className={styles.profile}
        onFinish={onFinish}
        initialValues={{
          fullName: userData.fullName,
          email: userData.email,
          title: userData.title,
          phone: userData.phoneNumber ?? "",
          address: userData.address ?? "",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={9}>
            <Flex vertical gap={16}>
              <MainCard
                isEditable={isEditable}
                toggleEditable={toggleEditable}
                generalInfo={generalInfo}
                handleToast={handleToast}
                userData={userData}
              />
              {/* <SocialCard
                onAddSocialLinks={handleAddSocialLinks}
                isEditable={isEditable}
                socialLinks={socialLinks}
                userData={userData}
              /> */}
            </Flex>
          </Col>
          <Col xs={24} md={15}>
            <Flex vertical gap={16}>
              <InformationCard
                generalInfo={generalInfo}
                isEditable={isEditable}
              />
              {/* <Card title="Các hoạt động gần đây">
                <Typography.Text>Chưa có hoạt động nào gần đây</Typography.Text>
              </Card> */}
            </Flex>
          </Col>
        </Row>
      </Form>
    </Suspense>
  );
}
