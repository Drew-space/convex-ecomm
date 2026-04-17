import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface OrderConfirmationProps {
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    phone: string;
  };
  reference: string;
}

export default function OrderConfirmation({
  customerName,
  items,
  totalAmount,
  deliveryAddress,
  reference,
}: OrderConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your order has been confirmed!</Preview>
      <Body style={{ backgroundColor: "#f6f6f6", fontFamily: "sans-serif" }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "32px",
          }}
        >
          <Heading style={{ fontSize: "24px", marginBottom: "8px" }}>
            Order Confirmed! 🎉
          </Heading>
          <Text style={{ color: "#555" }}>
            Hi {customerName}, thank you for your purchase. Here&#39;s your
            order summary:
          </Text>
          <Text style={{ fontSize: "12px", color: "#999" }}>
            Reference: {reference}
          </Text>

          <Hr />

          {/* Items */}
          {items.map((item, i) => (
            <Row key={i} style={{ marginBottom: "16px" }}>
              <Column style={{ width: "80px" }}>
                <Img
                  src={item.imageUrl}
                  width="72"
                  height="72"
                  alt={item.name}
                  style={{ borderRadius: "8px", objectFit: "cover" }}
                />
              </Column>
              <Column style={{ paddingLeft: "16px" }}>
                <Text style={{ margin: 0, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  Qty: {item.quantity}
                </Text>
                <Text style={{ margin: 0, fontSize: "14px" }}>
                  ₦{(item.price * item.quantity).toLocaleString()}
                </Text>
              </Column>
            </Row>
          ))}

          <Hr />

          {/* Total */}
          <Row>
            <Column>
              <Text style={{ fontWeight: "bold" }}>Total</Text>
            </Column>
            <Column align="right">
              <Text style={{ fontWeight: "bold" }}>
                ₦{totalAmount.toLocaleString()}
              </Text>
            </Column>
          </Row>

          <Hr />

          {/* Delivery */}
          <Heading as="h3" style={{ fontSize: "16px" }}>
            Delivery Address
          </Heading>
          <Text style={{ color: "#555", margin: 0 }}>
            {deliveryAddress.fullName}
          </Text>
          <Text style={{ color: "#555", margin: 0 }}>
            {deliveryAddress.street}
          </Text>
          <Text style={{ color: "#555", margin: 0 }}>
            {deliveryAddress.city}, {deliveryAddress.state}
          </Text>
          <Text style={{ color: "#555", margin: 0 }}>
            📞 {deliveryAddress.phone}
          </Text>

          <Hr />
          <Text
            style={{ color: "#999", fontSize: "12px", textAlign: "center" }}
          >
            Nextcommerce · Lagos, Nigeria
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
