import { createClient } from "@sanity/client";
const client = createClient({
  projectId: "1kykh7vm",
  dataset: "production",
  apiVersion: "2021-08-29",
  token:
    "skatPdx83KAVsmVcYWWvz1ISxMahCNVWMuxsRLOpxPaXgIRsrMjZMAp0zdHJ11RK78zfBY8ZFauMJvuIg75dONHTlHTDTau0FnWdd9386P3oNdQfPqXFQ516dsIAgB4Rnvhhb94BaU32lc12SJbhcJh4IPYIGzxUTN12KLqSj7aU5GecI45Z",
  useCdn: false,
});

async function uploadimage(uri) {
  const img = await fetch(uri);
  const blob = img.blob();
  const imageasset = await client.assets.upload("image", blob, {
    filename: "image",
  });
  return imageasset._id;
}

export default Sanity;

const styles = StyleSheet.create({});
