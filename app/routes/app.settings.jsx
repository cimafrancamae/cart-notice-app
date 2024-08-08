import {
  Box,
  Button,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Divider,
  useBreakpoints,
  ColorPicker,
  hsbToHex,
  Select,
  RangeSlider,
  PageActions,
  Checkbox,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import {useState, useCallback, useEffect} from 'react';
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import db from "../db.server";

export async function loader() {
  let setting = await db.setting.findFirst();
  return json(setting);
}

export async function action({ request }) {
  let settings = await request.formData();
  settings = Object.fromEntries(settings);

  await db.setting.upsert({
    where: {
      id: '1',
    },
    update: {
      id: '1',
      textSize: settings.textSize,
      textColor: settings.textColor,
      backgroundColor: settings.backgroundColor,
      borderColor: settings.borderColor,
      borderRadius: parseInt(settings.borderRadius),
    },
    create: {
      id: '1',
      textSize: settings.textSize,
      textColor: settings.textColor,
      backgroundColor: settings.backgroundColor,
      borderColor: settings.borderColor,
      borderRadius: parseInt(settings.borderRadius),
    },
  });

  return json(settings)
}

export default function SettingsPage() {
  const { smUp } = useBreakpoints();
  const settings = useLoaderData();

  const [formState, setFormState] = useState(settings);

  const options = [
    {label: 'small', value: '6px'},
    {label: 'medium', value: '10px'},
    {label: 'large', value: '14px'},
  ];

  const [textColor, setTextColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const [backgroundColor, setBackgroundColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const [borderColor, setBorderColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const [isTextColorPickerOpen, setIsTextColorPickerOpen] = useState(false);
  const [isBackgroundColorPickerOpen, setIsBackgroundColorPickerOpen] = useState(false);
  const [isBorderColorPickerOpen, setIsBorderColorPickerOpen] = useState(false);

  const handleTextColorChange = (color) => {
    setTextColor(color);
    setFormState({ ...formState, textColor: hexTextColor });
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
    setFormState({ ...formState, backgroundColor: hexBackgroundColor });
  };

  const handleBorderColorChange = (color) => {
    setBorderColor(color);
    setFormState({ ...formState, borderColor: hexBorderColor });
  };

  const toggleTextColorPicker = () => {
    setIsTextColorPickerOpen(!isTextColorPickerOpen);
  };

  const toggleBackgroundColorPicker = () => {
    setIsBackgroundColorPickerOpen(!isBackgroundColorPickerOpen);
  };

  const toggleBorderColorPicker = () => {
    setIsBorderColorPickerOpen(!isBorderColorPickerOpen);
  };

  const [enableCartNote, setCartNote] = useState(false);
  const handleCartNoteChange = useCallback(
    (newChecked) => {
      console.log(newChecked)
      setCartNote(newChecked)
    },[],
  );

  const hexTextColor = hsbToHex(textColor);
  const hexBackgroundColor = hsbToHex(backgroundColor);
  const hexBorderColor = hsbToHex(borderColor);

  useEffect(() => {
    if (enableCartNote) {
      console.log('cart note enabled')
      // const cartNoteInstance = cartNote();
      // cartNoteInstance.init();
    }
  },[enableCartNote])

  return (
    <Form method="POST">
      <Page>
        <TitleBar title="Settings" />
        <BlockStack gap={{ xs: "800", sm: "400" }}>
          <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
            <Box
              as="section"
              paddingInlineStart={{ xs: 400, sm: 0 }}
              paddingInlineEnd={{ xs: 400, sm: 0 }}
            >
              <BlockStack gap="400">
                <Text as="h3" variant="headingMd">
                  Cart Note
                </Text>
                <Text as="p" variant="bodyMd">
                  Enable or disable custom cart note.
                </Text>
              </BlockStack>
            </Box>
            <Card roundedAbove="sm">
              <BlockStack gap="400">
                <Checkbox
                  label="Enable cart note"
                  checked={enableCartNote}
                  onChange={handleCartNoteChange}
                />
              </BlockStack>
            </Card>
          </InlineGrid>
          {smUp ? <Divider /> : null}
        </BlockStack>
        <BlockStack gap={{ xs: "800", sm: "400" }}>
          <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
            <Box
              as="section"
              paddingInlineStart={{ xs: 400, sm: 0 }}
              paddingInlineEnd={{ xs: 400, sm: 0 }}
            >
              <BlockStack gap="400">
                <Text as="h3" variant="headingMd">
                  Cart Notice Style
                </Text>
                <Text as="p" variant="bodyMd">
                  Set the colors and styles of your cart notice.
                </Text>
              </BlockStack>
            </Box>
            <Card roundedAbove="sm">
              <BlockStack gap="400">
                <Select
                  label="Text Size"
                  name="textSize"
                  options={options}
                  onChange={(value) => setFormState({ ...formState, textSize: value })}
                  value={formState?.textSize}
                />

                <TextField label="Text Color" name="textColor" value={formState?.textColor} readOnly />
                <Button onClick={toggleTextColorPicker}>
                  {isTextColorPickerOpen ? 'Close' : 'Choose'}
                </Button>
                {isTextColorPickerOpen && (
                  <div style={{ marginTop: '10px' }}>
                    <ColorPicker onChange={handleTextColorChange} color={textColor} />
                  </div>
                )}

                <TextField label="Background Color" name="backgroundColor" value={formState?.backgroundColor} readOnly />
                <Button onClick={toggleBackgroundColorPicker}>
                  {isBackgroundColorPickerOpen ? 'Close' : 'Choose'}
                </Button>
                {isBackgroundColorPickerOpen && (
                  <div style={{ marginTop: '10px' }}>
                    <ColorPicker onChange={handleBackgroundColorChange} color={backgroundColor} />
                  </div>
                )}

                <TextField label="Border Color" name="borderColor" value={formState?.borderColor} readOnly />
                <Button onClick={toggleBorderColorPicker}>
                  {isBorderColorPickerOpen ? 'Close' : 'Choose'}
                </Button>
                {isBorderColorPickerOpen && (
                  <div style={{ marginTop: '10px' }}>
                    <ColorPicker onChange={handleBorderColorChange} color={borderColor} />
                  </div>
                )}

                <TextField label="Border Radius" name="borderRadius" value={formState?.borderRadius} readOnly />
                <RangeSlider
                  value={formState?.borderRadius}
                  onChange={(value) => setFormState({ ...formState, borderRadius: value })}
                  output
                />
              </BlockStack>
            </Card>
          </InlineGrid>
          {smUp ? <Divider /> : null}
        </BlockStack>
        <PageActions
          primaryAction={{
            content: 'Save',
            submit: true,
          }}
          secondaryActions={<Button>Reset</Button>}
        />
      </Page>
    </Form>
  );
}


