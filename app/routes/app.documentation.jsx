import React, { useRef } from "react";
import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  MediaCard,
  VideoThumbnail,
  Divider,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import StickyBox from "react-sticky-box";

const ScrollableSection = React.forwardRef(({ children }, ref) => (
  <div ref={ref}>{children}</div>
));

export default function DocumentationPage() {
  const introductionRef = useRef(null);
  const installationRef = useRef(null);
  const settingsRef = useRef(null);
  const usageRef = useRef(null);
  const supportRef = useRef(null);

  const sectionRefs = {
    introduction: introductionRef,
    installation: installationRef,
    settings: settingsRef,
    usage: usageRef,
    support: supportRef,
  };

  const scrollToSection = (section) => {
    const ref = sectionRefs[section];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Page>
      <TitleBar title="Documentation" />
      <Layout>
        <Layout.Section>
          <MediaCard
            id="introduction"
            portrait
            title="Introduction"
            primaryAction={{
              content: "Learn more",
              onAction: () => {},
            }}
            description="Welcome to the Elektra Cosmetics Wholesale App. This app allows you to manage the FREE SHIPPING notice and other important settings for your wholesale store. Follow this documentation to set up and make the most of your app."
            popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
          >
            <VideoThumbnail
              videoLength={80}
              thumbnailUrl="{{ 'logo_small.png' | asset_url }}"
              onClick={() => console.log("clicked")}
            />
          </MediaCard>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <ScrollableSection ref={installationRef}>
              <BlockStack gap="500">
                <Text as="h1" variant="headingLg">
                  Installation
                </Text>
                <Text variant="bodyMd" as="p">
                  To install the Elektra Cosmetics Wholesale App, follow these steps:
                </Text>
                <List type="number">
                  <List.Item>Go to the Shopify App Store and search for "Elektra Cosmetics Wholesale App."</List.Item>
                  <List.Item>Click on "Add app" and follow the installation steps.</List.Item>
                  <List.Item>Once installed, you will see the app in your Shopify admin under "Apps."</List.Item>
                </List>
                <Divider />
              </BlockStack>
              </ScrollableSection>
              <ScrollableSection ref={settingsRef}>
                <BlockStack gap="500">
                  <Text as="h1" variant="headingLg">
                    Settings
                  </Text>
                  <Text variant="bodyMd" as="p">
                    After installing the app, you can configure the settings to customize the FREE SHIPPING notice and other features.
                  </Text>
                  <Text as="h2" variant="headingMd">
                    Accessing Settings
                  </Text>
                  <List type="number">
                    <List.Item>Open the Shopify admin and go to "Apps."</List.Item>
                    <List.Item>Click on "Elektra Cosmetics Wholesale App."</List.Item>
                    <List.Item>Click on "Settings."</List.Item>
                  </List>
                  <Text as="h2" variant="headingMd">
                    Configurable Settings
                  </Text>
                  <List type="bullet">
                    <List.Item>Free Shipping Threshold: Set the minimum cart total required to qualify for free shipping.</List.Item>
                    <List.Item>Font Size: Adjust the font size of the text in the cart notice.</List.Item>
                    <List.Item>Text Align: Choose the alignment of the text (left, center, right).</List.Item>
                    <List.Item>Text Color: Set the color of the text.</List.Item>
                    <List.Item>Background Color: Set the background color of the cart notice.</List.Item>
                    <List.Item>Border Color: Set the color of the border around the cart notice.</List.Item>
                    <List.Item>Border Width: Adjust the width of the border around the cart notice.</List.Item>
                    <List.Item>Border Radius: Set the radius of the border corners for the cart notice.</List.Item>
                  </List>
                  <Divider />
                </BlockStack>
              </ScrollableSection>
              <ScrollableSection ref={usageRef}>
                <BlockStack gap="500">
                  <Text as="h1" variant="headingLg">
                    Usage
                  </Text>
                  <Text as="h2" variant="headingMd">
                    Managing the FREE SHIPPING Notice
                  </Text>
                  <List type="number">
                    <List.Item>Navigate to the cart page on your Shopify store.</List.Item>
                    <List.Item>The cart notice will dynamically display how much more a customer needs to spend to qualify for free shipping.</List.Item>
                    <List.Item>The notice will update based on the cart total and display a message when the customer qualifies for free shipping.</List.Item>
                  </List>
                  <Text as="h2" variant="headingMd">
                    Special Instructions in Cart Notes
                  </Text>
                  <List type="number">
                    <List.Item>The app modifies the cart note section to include special instruction checkboxes.</List.Item>
                    <List.Item>Customers can select options like "Need by a specific date," "Ship to a different address," and "Would like information about samples."</List.Item>
                    <List.Item>These options can be managed in the settings of the app.</List.Item>
                  </List>
                  <Text as="h2" variant="headingMd">
                    Enabling/Disabling Features
                  </Text>
                  <List type="bullet">
                    <List.Item>To enable or disable the FREE SHIPPING notice or other features, go to the app settings and toggle the relevant options.</List.Item>
                  </List>
                  <Divider />
                </BlockStack>
              </ScrollableSection>
              <ScrollableSection ref={supportRef}>
                <BlockStack gap="500">
                  <Text as="h1" variant="headingLg">
                    Support
                  </Text>
                  <Text variant="bodyMd" as="p">
                    If you encounter any issues or have any questions, please reach out to our support team:
                  </Text>
                  <List type="bullet">
                    <List.Item>Email: info@scrippt.dev</List.Item>
                    <List.Item>Phone: +63 (995) 857-8468</List.Item>
                    <List.Item>Support Hours: Monday to Friday, 9 AM - 5 PM (GMT+8)</List.Item>
                  </List>
                  <Divider borderColor="transparent" />
                </BlockStack>
              </ScrollableSection>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Table of Contents
              </Text>
              <List>
                <List.Item>
                  <Link
                    onClick={() => scrollToSection("introduction")}
                    removeUnderline
                  >
                    Introduction
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    onClick={() => scrollToSection("installation")}
                    removeUnderline
                  >
                    Installation
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    onClick={() => scrollToSection("settings")}
                    removeUnderline
                  >
                    Settings
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    onClick={() => scrollToSection("usage")}
                    removeUnderline
                  >
                    Usage
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    onClick={() => scrollToSection("support")}
                    removeUnderline
                  >
                    Support
                  </Link>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
          <StickyBox offsetTop={100} offsetBottom={20}>
            <div>Sidebar</div>
          </StickyBox>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
