import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  EmptyState,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  
};

export default function Index() {
  const shopify = useAppBridge();

  return (
    <>
      <style>
        {`
          .Polaris-EmptyState__Image.Polaris-EmptyState--loaded {
            opacity: 1;
            width: 150px;
            height: auto;
            padding: 10px;
        }
        `}
      </style>
      <Page>
        <TitleBar title="Overview" />
        <BlockStack gap="500">
          <Layout>
            <Layout.Section>
            <Card sectioned>
              <EmptyState
                heading="Elektra Cosmetics Wholesale App"
                action={{
                  content: 'Settings',
                  url: '/app/settings'
                }}
                secondaryAction={{
                  content: 'Read Documentation',
                  url: '/app/documentation',
                }}
                image="/app/assets/logo_small.png"
              >
                <p>Manage FREE SHIPPING notice and more.</p>
              </EmptyState>
            </Card>
            </Layout.Section>
            <Layout.Section variant="oneThird">
              <BlockStack gap="500">
                <Card>
                  <BlockStack gap="200">
                    <Text as="h2" variant="headingMd">
                      App template specs
                    </Text>
                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Text as="span" variant="bodyMd">
                          Framework
                        </Text>
                        <Link
                          url="https://remix.run"
                          target="_blank"
                          removeUnderline
                        >
                          Remix
                        </Link>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text as="span" variant="bodyMd">
                          Database
                        </Text>
                        <Link
                          url="https://www.prisma.io/"
                          target="_blank"
                          removeUnderline
                        >
                          Prisma
                        </Link>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text as="span" variant="bodyMd">
                          Interface
                        </Text>
                        <span>
                          <Link
                            url="https://polaris.shopify.com"
                            target="_blank"
                            removeUnderline
                          >
                            Polaris
                          </Link>
                          {", "}
                          <Link
                            url="https://shopify.dev/docs/apps/tools/app-bridge"
                            target="_blank"
                            removeUnderline
                          >
                            App Bridge
                          </Link>
                        </span>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text as="span" variant="bodyMd">
                          API
                        </Text>
                        <Link
                          url="https://shopify.dev/docs/api/admin-graphql"
                          target="_blank"
                          removeUnderline
                        >
                          GraphQL API
                        </Link>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text as="span" variant="bodyMd">
                          Repository
                        </Text>
                        <Link
                          url="https://github.com/cimafrancamae/cart-notice-app"
                          target="_blank"
                          removeUnderline
                        >
                          Github
                        </Link>
                      </InlineStack>
                      <InlineStack align="space-between">
                        <Text as="span" variant="bodyMd">
                          Developer
                        </Text>
                        <Link
                          url="#"
                          target="_blank"
                          removeUnderline
                        >
                          Scrippt Dev
                        </Link>
                      </InlineStack>
                    </BlockStack>
                  </BlockStack>
                </Card>
              </BlockStack>
            </Layout.Section>
          </Layout>
        </BlockStack>
      </Page>
    </>
  );
}
