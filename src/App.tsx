import { MultiSelect, } from '@mantine/core';
import { MantineProvider } from "@mantine/core";



export const App = () => {
  return (
    <>
    <MantineProvider>
      <MultiSelect/>
    </MantineProvider>
    </>
  );
};