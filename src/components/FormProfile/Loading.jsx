import { Card, Col, Flex, Row, Skeleton } from "antd";

export default function Loading() {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={9}>
        <Flex vertical gap={16}>
          <Card>
            <Skeleton active />
          </Card>
          <Card>
            <Skeleton active />
          </Card>
        </Flex>
      </Col>
      <Col xs={24} md={15}>
        <Flex vertical gap={16}>
          <Card>
            <Skeleton active />
          </Card>
          <Card>
            <Skeleton active />
          </Card>
        </Flex>
      </Col>
    </Row>
  );
}
