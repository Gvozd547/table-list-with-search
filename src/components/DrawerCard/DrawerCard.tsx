import { Col, Drawer, Image, Row } from "antd";
import { IllustrationData } from "../../services";
import { DescriptionItem } from "./DescriptionItem";
import "./DrawerCard.css";

interface DrawerCardProps {
  visible: boolean;
  data: IllustrationData | null;
  setVisible: (state: boolean) => void;
}

export const DrawerCard = ({ visible, setVisible, data }: DrawerCardProps) => {
  return (
    <Drawer
      height={340}
      onClose={() => setVisible(false)}
      placement="bottom"
      visible={visible}
      className="drawer-card"
    >
      <h1>Card Meta</h1>
      {data ? (
        <Row
          justify="space-around"
          align="middle"
          style={{
            alignItems: "stretch",
          }}
        >
          <Col span={6}>
            <Image
              src={data.cover}
              key={data.cover}
              width={200}
              height={200}
              loading="eager"
            />
          </Col>
          <Col span={9}>
            <DescriptionItem title="ID" content={data?.id} />
            <DescriptionItem title="Name" content={data?.name} />
            <DescriptionItem title="Pack Name" content={data?.pack.name} />
          </Col>
          <Col span={9}>
            <DescriptionItem title="Created Date" content={data?.createdDate} />
            <DescriptionItem
              type="array"
              title="Keywords"
              content={data?.keywords}
            />
            <DescriptionItem
              type="array"
              title="Assigned Extensions"
              content={data?.assignedExtensions}
            />
          </Col>
        </Row>
      ) : (
        <p>NO_DATA</p>
      )}
    </Drawer>
  );
};
