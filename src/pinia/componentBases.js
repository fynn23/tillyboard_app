import { defineStore } from 'pinia';
import { getInheritedConfiguration } from '@/_common/helpers/configuration/configuration';
 
/* wwFront:start */
import plugincabb43dd616141408ebf03b6fb045a0b from '@/components/plugins/plugin-cabb43dd-6161-4140-8ebf-03b6fb045a0b/ww-config.js';
import plugin8bc1b5c929e44269becba2e1a8de9127 from '@/components/plugins/plugin-8bc1b5c9-29e4-4269-becb-a2e1a8de9127/ww-config.js';
import plugin832d6f7a42c343f1a3ce9a678272f811 from '@/components/plugins/plugin-832d6f7a-42c3-43f1-a3ce-9a678272f811/ww-config.js';
import plugin69d4a5bb09a34f3da94e667c21c057eb from '@/components/plugins/plugin-69d4a5bb-09a3-4f3d-a94e-667c21c057eb/ww-config.js';
import plugin1fa0dd685069436c9a7d3b54c340f1fa from '@/components/plugins/plugin-1fa0dd68-5069-436c-9a7d-3b54c340f1fa/ww-config.js';
import plugin66a79c9870e74bc4885920776b024ec2 from '@/components/plugins/plugin-66a79c98-70e7-4bc4-8859-20776b024ec2/ww-config.js';
import plugind66a250d8468469ead33ee028f632398 from '@/components/plugins/plugin-d66a250d-8468-469e-ad33-ee028f632398/ww-config.js';
import pluginf9ef41c31c534857855bf2f6a40b7186 from '@/components/plugins/plugin-f9ef41c3-1c53-4857-855b-f2f6a40b7186/ww-config.js';
import plugin2bd1c68831c5443eae2559aa5b6431fb from '@/components/plugins/plugin-2bd1c688-31c5-443e-ae25-59aa5b6431fb/ww-config.js';
import plugin3a407b459c63471db09b15cf797e5566 from '@/components/plugins/plugin-3a407b45-9c63-471d-b09b-15cf797e5566/ww-config.js';
import pluginee24f5ace15e4dddbaa40b4baedf90c9 from '@/components/plugins/plugin-ee24f5ac-e15e-4ddd-baa4-0b4baedf90c9/ww-config.js';
import plugin2adce8d52056479da21a068f55a8077f from '@/components/plugins/plugin-2adce8d5-2056-479d-a21a-068f55a8077f/ww-config.js';
import plugin9c40819b4a8f468f9ba54b9699f3361f from '@/components/plugins/plugin-9c40819b-4a8f-468f-9ba5-4b9699f3361f/ww-config.js';
import section99586bd32b154d6ba0256a50d07ca845 from '@/components/sections/section-99586bd3-2b15-4d6b-a025-6a50d07ca845/ww-config.js';
import sectionef0ecc719a594eab94b0b36d66d3d61d from '@/components/sections/section-ef0ecc71-9a59-4eab-94b0-b36d66d3d61d/ww-config.js';
import wwobjecta3191a7e88b64e90a36ad86ae4700a1f from '@/components/elements/element-a3191a7e-88b6-4e90-a36a-d86ae4700a1f/ww-config.js';
import wwobjectec3aa24b797d43808e79e3ce1a7401c9 from '@/components/elements/element-ec3aa24b-797d-4380-8e79-e3ce1a7401c9/ww-config.js';
import wwobjecta6c2c9bd0dd445ffaa20181248bde7fd from '@/components/elements/element-a6c2c9bd-0dd4-45ff-aa20-181248bde7fd/ww-config.js';
import wwobject1d0468f84d3346fb9c58b3742aa7d55a from '@/components/elements/element-1d0468f8-4d33-46fb-9c58-b3742aa7d55a/ww-config.js';
import wwobject2d18ef4ce9e54dc6a29d01d9f797be5e from '@/components/elements/element-2d18ef4c-e9e5-4dc6-a29d-01d9f797be5e/ww-config.js';
import wwobject734633a1457d4fe59eaa773dddc755f1 from '@/components/elements/element-734633a1-457d-4fe5-9eaa-773dddc755f1/ww-config.js';
import wwobject21881619a984484781a9922c3dbb5853 from '@/components/elements/element-21881619-a984-4847-81a9-922c3dbb5853/ww-config.js';
import wwobject700d9467e29c4129b103664e9d8611dd from '@/components/elements/element-700d9467-e29c-4129-b103-664e9d8611dd/ww-config.js';
import wwobjectaeb78b9a6fb64c49931dfaedcfad67ba from '@/components/elements/element-aeb78b9a-6fb6-4c49-931d-faedcfad67ba/ww-config.js';
import wwobjectfd8c482f532c4aeba7ae6904a6b62a1b from '@/components/elements/element-fd8c482f-532c-4aeb-a7ae-6904a6b62a1b/ww-config.js';
import wwobject0ca4e3ac3c7b4e1cbf4eb87d5ed302b3 from '@/components/elements/element-0ca4e3ac-3c7b-4e1c-bf4e-b87d5ed302b3/ww-config.js';
import wwobject1de5438e83c940f4b51986885e3e6416 from '@/components/elements/element-1de5438e-83c9-40f4-b519-86885e3e6416/ww-config.js';
import wwobjecta311c0b1c8ce472babb1e9b98b076e1b from '@/components/elements/element-a311c0b1-c8ce-472b-abb1-e9b98b076e1b/ww-config.js';
import wwobject0dc461bb103e4b2e80e0846ec3c30a6e from '@/components/elements/element-0dc461bb-103e-4b2e-80e0-846ec3c30a6e/ww-config.js';
import wwobject0d3e75d19e7744cba2728b0825fbc5da from '@/components/elements/element-0d3e75d1-9e77-44cb-a272-8b0825fbc5da/ww-config.js';
import wwobject69d0b3efb265494c8cd1874da4aa1834 from '@/components/elements/element-69d0b3ef-b265-494c-8cd1-874da4aa1834/ww-config.js';
import wwobject83d890fb84f94386b459fb4be89a8e15 from '@/components/elements/element-83d890fb-84f9-4386-b459-fb4be89a8e15/ww-config.js';
import wwobject6ba133b6a444414f93a525cd237dd398 from '@/components/elements/element-6ba133b6-a444-414f-93a5-25cd237dd398/ww-config.js';
import wwobjectaf811adf94d949ddab22e2f29ae30299 from '@/components/elements/element-af811adf-94d9-49dd-ab22-e2f29ae30299/ww-config.js';
import wwobject6f8796b18273498d95fc7013b7c63214 from '@/components/elements/element-6f8796b1-8273-498d-95fc-7013b7c63214/ww-config.js';
import wwobject88ef76b646d54685878f2f1fa0d54cb8 from '@/components/elements/element-88ef76b6-46d5-4685-878f-2f1fa0d54cb8/ww-config.js';
import wwobject73a13effbdc74021bdc6413c97fe91c1 from '@/components/elements/element-73a13eff-bdc7-4021-bdc6-413c97fe91c1/ww-config.js';
import wwobject9256b033f4e84ab4adcedac3a940d7f5 from '@/components/elements/element-9256b033-f4e8-4ab4-adce-dac3a940d7f5/ww-config.js';
import wwobject61825dc396de46e1a8c4b091289d8448 from '@/components/elements/element-61825dc3-96de-46e1-a8c4-b091289d8448/ww-config.js';
import wwobjectd7904e9dfc9a4d809e32728e097879ad from '@/components/elements/element-d7904e9d-fc9a-4d80-9e32-728e097879ad/ww-config.js';
import wwobject7179ba70c5d749a59828f85704fd1efc from '@/components/elements/element-7179ba70-c5d7-49a5-9828-f85704fd1efc/ww-config.js';
import wwobject9202d35c281345bca7f30adb85f83e5e from '@/components/elements/element-9202d35c-2813-45bc-a7f3-0adb85f83e5e/ww-config.js';
import wwobject2fd375f8f5c74d81881ddacd40bc0ad3 from '@/components/elements/element-2fd375f8-f5c7-4d81-881d-dacd40bc0ad3/ww-config.js';
import wwobjectaa27b26f06864c2998c58217044045b7 from '@/components/elements/element-aa27b26f-0686-4c29-98c5-8217044045b7/ww-config.js';
import wwobject2dff59573bd846f9afa3a5c5bab91931 from '@/components/elements/element-2dff5957-3bd8-46f9-afa3-a5c5bab91931/ww-config.js';
import wwobject3a7d637912d3438798ffb332bb492a63 from '@/components/elements/element-3a7d6379-12d3-4387-98ff-b332bb492a63/ww-config.js';
import wwobjectb783dc65d5284f748c14e27c934c39b1 from '@/components/elements/element-b783dc65-d528-4f74-8c14-e27c934c39b1/ww-config.js';
import wwobject14723a2101784d92a7e9d1dfeaec29a7 from '@/components/elements/element-14723a21-0178-4d92-a7e9-d1dfeaec29a7/ww-config.js';
import wwobjectf4c24d06bc884b62add34d1f8b42221c from '@/components/elements/element-f4c24d06-bc88-4b62-add3-4d1f8b42221c/ww-config.js';
import wwobject53401515b6944c79a88dabeecb1de562 from '@/components/elements/element-53401515-b694-4c79-a88d-abeecb1de562/ww-config.js';
import wwobject18998884a7574a8780fe44f129cf0962 from '@/components/elements/element-18998884-a757-4a87-80fe-44f129cf0962/ww-config.js';
import wwobject3265984aeb924d73b702dbd0e4d1472e from '@/components/elements/element-3265984a-eb92-4d73-b702-dbd0e4d1472e/ww-config.js';
import wwobject90cd6854c2134f06806cbe321342389b from '@/components/elements/element-90cd6854-c213-4f06-806c-be321342389b/ww-config.js';
import wwobject5b61c2ee96e3402f9f64596f5e3002f2 from '@/components/elements/element-5b61c2ee-96e3-402f-9f64-596f5e3002f2/ww-config.js';
import wwobject85044fa48fc041159eafca30a1b4b528 from '@/components/elements/element-85044fa4-8fc0-4115-9eaf-ca30a1b4b528/ww-config.js';
import wwobject5a88036f22ea4f8db4a5bc226ef95061 from '@/components/elements/element-5a88036f-22ea-4f8d-b4a5-bc226ef95061/ww-config.js';
import wwobject6d692ca26cdc4805aa0c211102f335d0 from '@/components/elements/element-6d692ca2-6cdc-4805-aa0c-211102f335d0/ww-config.js';
import wwobject1b1e21739b7842cca8eea6167caea340 from '@/components/elements/element-1b1e2173-9b78-42cc-a8ee-a6167caea340/ww-config.js';
import wwobject4ce97e3671b148d5b89def045c0e939e from '@/components/elements/element-4ce97e36-71b1-48d5-b89d-ef045c0e939e/ww-config.js';
import wwobject6047b8df81b745a7a6b37355fb2fa3cd from '@/components/elements/element-6047b8df-81b7-45a7-a6b3-7355fb2fa3cd/ww-config.js';
import wwobject9f3c91ad1667473eb530521daa099a14 from '@/components/elements/element-9f3c91ad-1667-473e-b530-521daa099a14/ww-config.js';
import wwobject5c57cd3e0efb451f872a17f0583ef682 from '@/components/elements/element-5c57cd3e-0efb-451f-872a-17f0583ef682/ww-config.js';
import wwobject97a634605c254d74ac1f86693c2e4a08 from '@/components/elements/element-97a63460-5c25-4d74-ac1f-86693c2e4a08/ww-config.js';
import wwobjectaa29a66107ce484e8abb456186211282 from '@/components/elements/element-aa29a661-07ce-484e-8abb-456186211282/ww-config.js';
import wwobject57831abf83ad49adba973bd30b035710 from '@/components/elements/element-57831abf-83ad-49ad-ba97-3bd30b035710/ww-config.js';
import wwobject59dca300db7842e4a7a60cbf22d3cc82 from '@/components/elements/element-59dca300-db78-42e4-a7a6-0cbf22d3cc82/ww-config.js';
import wwobjecta6cb6a4d6af74cd6b530a15d9ec64488 from '@/components/elements/element-a6cb6a4d-6af7-4cd6-b530-a15d9ec64488/ww-config.js';
import wwobjecte2962a2203b34421b85e906177d2303f from '@/components/elements/element-e2962a22-03b3-4421-b85e-906177d2303f/ww-config.js';
import wwobject1ba25bdfdee94e0ea0b8b3f3128c3b65 from '@/components/elements/element-1ba25bdf-dee9-4e0e-a0b8-b3f3128c3b65/ww-config.js';
import wwobjectd2eeb897ad9549e48394fe3f5c9a81fb from '@/components/elements/element-d2eeb897-ad95-49e4-8394-fe3f5c9a81fb/ww-config.js';
import wwobject60676ae599b1427893304299cd99c5cf from '@/components/elements/element-60676ae5-99b1-4278-9330-4299cd99c5cf/ww-config.js';
import wwobject9ecb2cfccef74be8b7363e17a3b7e9ff from '@/components/elements/element-9ecb2cfc-cef7-4be8-b736-3e17a3b7e9ff/ww-config.js';
import wwobject6145eb600af84e52bcc6dc0f6743654e from '@/components/elements/element-6145eb60-0af8-4e52-bcc6-dc0f6743654e/ww-config.js';
import wwobjectdeb10a015eef4aa190171b51c2ad6fd0 from '@/components/elements/element-deb10a01-5eef-4aa1-9017-1b51c2ad6fd0/ww-config.js';
import wwobject985570fcb3c04566800482ab3b30a11d from '@/components/elements/element-985570fc-b3c0-4566-8004-82ab3b30a11d/ww-config.js';
import wwobjecta823467cbdc74ceca38c71875c4c214a from '@/components/elements/element-a823467c-bdc7-4cec-a38c-71875c4c214a/ww-config.js';
import wwobject9ae1fce82e314bfda4d20450235bdfd5 from '@/components/elements/element-9ae1fce8-2e31-4bfd-a4d2-0450235bdfd5/ww-config.js';
import wwobjectc6c0c00e49fd4cb9bd785bc09945721e from '@/components/elements/element-c6c0c00e-49fd-4cb9-bd78-5bc09945721e/ww-config.js';
/* wwFront:end */

export const useComponentBasesStore = defineStore('componentBases', () => {
    let configurations;
    /* wwFront:start */
    // eslint-disable-next-line no-undef
    configurations = {'plugin-cabb43dd-6161-4140-8ebf-03b6fb045a0b': getInheritedConfiguration({ ...plugincabb43dd616141408ebf03b6fb045a0b, name: 'plugin-cabb43dd-6161-4140-8ebf-03b6fb045a0b' }),
'plugin-8bc1b5c9-29e4-4269-becb-a2e1a8de9127': getInheritedConfiguration({ ...plugin8bc1b5c929e44269becba2e1a8de9127, name: 'plugin-8bc1b5c9-29e4-4269-becb-a2e1a8de9127' }),
'plugin-832d6f7a-42c3-43f1-a3ce-9a678272f811': getInheritedConfiguration({ ...plugin832d6f7a42c343f1a3ce9a678272f811, name: 'plugin-832d6f7a-42c3-43f1-a3ce-9a678272f811' }),
'plugin-69d4a5bb-09a3-4f3d-a94e-667c21c057eb': getInheritedConfiguration({ ...plugin69d4a5bb09a34f3da94e667c21c057eb, name: 'plugin-69d4a5bb-09a3-4f3d-a94e-667c21c057eb' }),
'plugin-1fa0dd68-5069-436c-9a7d-3b54c340f1fa': getInheritedConfiguration({ ...plugin1fa0dd685069436c9a7d3b54c340f1fa, name: 'plugin-1fa0dd68-5069-436c-9a7d-3b54c340f1fa' }),
'plugin-66a79c98-70e7-4bc4-8859-20776b024ec2': getInheritedConfiguration({ ...plugin66a79c9870e74bc4885920776b024ec2, name: 'plugin-66a79c98-70e7-4bc4-8859-20776b024ec2' }),
'plugin-d66a250d-8468-469e-ad33-ee028f632398': getInheritedConfiguration({ ...plugind66a250d8468469ead33ee028f632398, name: 'plugin-d66a250d-8468-469e-ad33-ee028f632398' }),
'plugin-f9ef41c3-1c53-4857-855b-f2f6a40b7186': getInheritedConfiguration({ ...pluginf9ef41c31c534857855bf2f6a40b7186, name: 'plugin-f9ef41c3-1c53-4857-855b-f2f6a40b7186' }),
'plugin-2bd1c688-31c5-443e-ae25-59aa5b6431fb': getInheritedConfiguration({ ...plugin2bd1c68831c5443eae2559aa5b6431fb, name: 'plugin-2bd1c688-31c5-443e-ae25-59aa5b6431fb' }),
'plugin-3a407b45-9c63-471d-b09b-15cf797e5566': getInheritedConfiguration({ ...plugin3a407b459c63471db09b15cf797e5566, name: 'plugin-3a407b45-9c63-471d-b09b-15cf797e5566' }),
'plugin-ee24f5ac-e15e-4ddd-baa4-0b4baedf90c9': getInheritedConfiguration({ ...pluginee24f5ace15e4dddbaa40b4baedf90c9, name: 'plugin-ee24f5ac-e15e-4ddd-baa4-0b4baedf90c9' }),
'plugin-2adce8d5-2056-479d-a21a-068f55a8077f': getInheritedConfiguration({ ...plugin2adce8d52056479da21a068f55a8077f, name: 'plugin-2adce8d5-2056-479d-a21a-068f55a8077f' }),
'plugin-9c40819b-4a8f-468f-9ba5-4b9699f3361f': getInheritedConfiguration({ ...plugin9c40819b4a8f468f9ba54b9699f3361f, name: 'plugin-9c40819b-4a8f-468f-9ba5-4b9699f3361f' }),
'section-99586bd3-2b15-4d6b-a025-6a50d07ca845': getInheritedConfiguration({ ...section99586bd32b154d6ba0256a50d07ca845, name: 'section-99586bd3-2b15-4d6b-a025-6a50d07ca845' }),
'section-ef0ecc71-9a59-4eab-94b0-b36d66d3d61d': getInheritedConfiguration({ ...sectionef0ecc719a594eab94b0b36d66d3d61d, name: 'section-ef0ecc71-9a59-4eab-94b0-b36d66d3d61d' }),
'wwobject-a3191a7e-88b6-4e90-a36a-d86ae4700a1f': getInheritedConfiguration({ ...wwobjecta3191a7e88b64e90a36ad86ae4700a1f, name: 'wwobject-a3191a7e-88b6-4e90-a36a-d86ae4700a1f' }),
'wwobject-ec3aa24b-797d-4380-8e79-e3ce1a7401c9': getInheritedConfiguration({ ...wwobjectec3aa24b797d43808e79e3ce1a7401c9, name: 'wwobject-ec3aa24b-797d-4380-8e79-e3ce1a7401c9' }),
'wwobject-a6c2c9bd-0dd4-45ff-aa20-181248bde7fd': getInheritedConfiguration({ ...wwobjecta6c2c9bd0dd445ffaa20181248bde7fd, name: 'wwobject-a6c2c9bd-0dd4-45ff-aa20-181248bde7fd' }),
'wwobject-1d0468f8-4d33-46fb-9c58-b3742aa7d55a': getInheritedConfiguration({ ...wwobject1d0468f84d3346fb9c58b3742aa7d55a, name: 'wwobject-1d0468f8-4d33-46fb-9c58-b3742aa7d55a' }),
'wwobject-2d18ef4c-e9e5-4dc6-a29d-01d9f797be5e': getInheritedConfiguration({ ...wwobject2d18ef4ce9e54dc6a29d01d9f797be5e, name: 'wwobject-2d18ef4c-e9e5-4dc6-a29d-01d9f797be5e' }),
'wwobject-734633a1-457d-4fe5-9eaa-773dddc755f1': getInheritedConfiguration({ ...wwobject734633a1457d4fe59eaa773dddc755f1, name: 'wwobject-734633a1-457d-4fe5-9eaa-773dddc755f1' }),
'wwobject-21881619-a984-4847-81a9-922c3dbb5853': getInheritedConfiguration({ ...wwobject21881619a984484781a9922c3dbb5853, name: 'wwobject-21881619-a984-4847-81a9-922c3dbb5853' }),
'wwobject-700d9467-e29c-4129-b103-664e9d8611dd': getInheritedConfiguration({ ...wwobject700d9467e29c4129b103664e9d8611dd, name: 'wwobject-700d9467-e29c-4129-b103-664e9d8611dd' }),
'wwobject-aeb78b9a-6fb6-4c49-931d-faedcfad67ba': getInheritedConfiguration({ ...wwobjectaeb78b9a6fb64c49931dfaedcfad67ba, name: 'wwobject-aeb78b9a-6fb6-4c49-931d-faedcfad67ba' }),
'wwobject-fd8c482f-532c-4aeb-a7ae-6904a6b62a1b': getInheritedConfiguration({ ...wwobjectfd8c482f532c4aeba7ae6904a6b62a1b, name: 'wwobject-fd8c482f-532c-4aeb-a7ae-6904a6b62a1b' }),
'wwobject-0ca4e3ac-3c7b-4e1c-bf4e-b87d5ed302b3': getInheritedConfiguration({ ...wwobject0ca4e3ac3c7b4e1cbf4eb87d5ed302b3, name: 'wwobject-0ca4e3ac-3c7b-4e1c-bf4e-b87d5ed302b3' }),
'wwobject-1de5438e-83c9-40f4-b519-86885e3e6416': getInheritedConfiguration({ ...wwobject1de5438e83c940f4b51986885e3e6416, name: 'wwobject-1de5438e-83c9-40f4-b519-86885e3e6416' }),
'wwobject-a311c0b1-c8ce-472b-abb1-e9b98b076e1b': getInheritedConfiguration({ ...wwobjecta311c0b1c8ce472babb1e9b98b076e1b, name: 'wwobject-a311c0b1-c8ce-472b-abb1-e9b98b076e1b' }),
'wwobject-0dc461bb-103e-4b2e-80e0-846ec3c30a6e': getInheritedConfiguration({ ...wwobject0dc461bb103e4b2e80e0846ec3c30a6e, name: 'wwobject-0dc461bb-103e-4b2e-80e0-846ec3c30a6e' }),
'wwobject-0d3e75d1-9e77-44cb-a272-8b0825fbc5da': getInheritedConfiguration({ ...wwobject0d3e75d19e7744cba2728b0825fbc5da, name: 'wwobject-0d3e75d1-9e77-44cb-a272-8b0825fbc5da' }),
'wwobject-69d0b3ef-b265-494c-8cd1-874da4aa1834': getInheritedConfiguration({ ...wwobject69d0b3efb265494c8cd1874da4aa1834, name: 'wwobject-69d0b3ef-b265-494c-8cd1-874da4aa1834' }),
'wwobject-83d890fb-84f9-4386-b459-fb4be89a8e15': getInheritedConfiguration({ ...wwobject83d890fb84f94386b459fb4be89a8e15, name: 'wwobject-83d890fb-84f9-4386-b459-fb4be89a8e15' }),
'wwobject-6ba133b6-a444-414f-93a5-25cd237dd398': getInheritedConfiguration({ ...wwobject6ba133b6a444414f93a525cd237dd398, name: 'wwobject-6ba133b6-a444-414f-93a5-25cd237dd398' }),
'wwobject-af811adf-94d9-49dd-ab22-e2f29ae30299': getInheritedConfiguration({ ...wwobjectaf811adf94d949ddab22e2f29ae30299, name: 'wwobject-af811adf-94d9-49dd-ab22-e2f29ae30299' }),
'wwobject-6f8796b1-8273-498d-95fc-7013b7c63214': getInheritedConfiguration({ ...wwobject6f8796b18273498d95fc7013b7c63214, name: 'wwobject-6f8796b1-8273-498d-95fc-7013b7c63214' }),
'wwobject-88ef76b6-46d5-4685-878f-2f1fa0d54cb8': getInheritedConfiguration({ ...wwobject88ef76b646d54685878f2f1fa0d54cb8, name: 'wwobject-88ef76b6-46d5-4685-878f-2f1fa0d54cb8' }),
'wwobject-73a13eff-bdc7-4021-bdc6-413c97fe91c1': getInheritedConfiguration({ ...wwobject73a13effbdc74021bdc6413c97fe91c1, name: 'wwobject-73a13eff-bdc7-4021-bdc6-413c97fe91c1' }),
'wwobject-9256b033-f4e8-4ab4-adce-dac3a940d7f5': getInheritedConfiguration({ ...wwobject9256b033f4e84ab4adcedac3a940d7f5, name: 'wwobject-9256b033-f4e8-4ab4-adce-dac3a940d7f5' }),
'wwobject-61825dc3-96de-46e1-a8c4-b091289d8448': getInheritedConfiguration({ ...wwobject61825dc396de46e1a8c4b091289d8448, name: 'wwobject-61825dc3-96de-46e1-a8c4-b091289d8448' }),
'wwobject-d7904e9d-fc9a-4d80-9e32-728e097879ad': getInheritedConfiguration({ ...wwobjectd7904e9dfc9a4d809e32728e097879ad, name: 'wwobject-d7904e9d-fc9a-4d80-9e32-728e097879ad' }),
'wwobject-7179ba70-c5d7-49a5-9828-f85704fd1efc': getInheritedConfiguration({ ...wwobject7179ba70c5d749a59828f85704fd1efc, name: 'wwobject-7179ba70-c5d7-49a5-9828-f85704fd1efc' }),
'wwobject-9202d35c-2813-45bc-a7f3-0adb85f83e5e': getInheritedConfiguration({ ...wwobject9202d35c281345bca7f30adb85f83e5e, name: 'wwobject-9202d35c-2813-45bc-a7f3-0adb85f83e5e' }),
'wwobject-2fd375f8-f5c7-4d81-881d-dacd40bc0ad3': getInheritedConfiguration({ ...wwobject2fd375f8f5c74d81881ddacd40bc0ad3, name: 'wwobject-2fd375f8-f5c7-4d81-881d-dacd40bc0ad3' }),
'wwobject-aa27b26f-0686-4c29-98c5-8217044045b7': getInheritedConfiguration({ ...wwobjectaa27b26f06864c2998c58217044045b7, name: 'wwobject-aa27b26f-0686-4c29-98c5-8217044045b7' }),
'wwobject-2dff5957-3bd8-46f9-afa3-a5c5bab91931': getInheritedConfiguration({ ...wwobject2dff59573bd846f9afa3a5c5bab91931, name: 'wwobject-2dff5957-3bd8-46f9-afa3-a5c5bab91931' }),
'wwobject-3a7d6379-12d3-4387-98ff-b332bb492a63': getInheritedConfiguration({ ...wwobject3a7d637912d3438798ffb332bb492a63, name: 'wwobject-3a7d6379-12d3-4387-98ff-b332bb492a63' }),
'wwobject-b783dc65-d528-4f74-8c14-e27c934c39b1': getInheritedConfiguration({ ...wwobjectb783dc65d5284f748c14e27c934c39b1, name: 'wwobject-b783dc65-d528-4f74-8c14-e27c934c39b1' }),
'wwobject-14723a21-0178-4d92-a7e9-d1dfeaec29a7': getInheritedConfiguration({ ...wwobject14723a2101784d92a7e9d1dfeaec29a7, name: 'wwobject-14723a21-0178-4d92-a7e9-d1dfeaec29a7' }),
'wwobject-f4c24d06-bc88-4b62-add3-4d1f8b42221c': getInheritedConfiguration({ ...wwobjectf4c24d06bc884b62add34d1f8b42221c, name: 'wwobject-f4c24d06-bc88-4b62-add3-4d1f8b42221c' }),
'wwobject-53401515-b694-4c79-a88d-abeecb1de562': getInheritedConfiguration({ ...wwobject53401515b6944c79a88dabeecb1de562, name: 'wwobject-53401515-b694-4c79-a88d-abeecb1de562' }),
'wwobject-18998884-a757-4a87-80fe-44f129cf0962': getInheritedConfiguration({ ...wwobject18998884a7574a8780fe44f129cf0962, name: 'wwobject-18998884-a757-4a87-80fe-44f129cf0962' }),
'wwobject-3265984a-eb92-4d73-b702-dbd0e4d1472e': getInheritedConfiguration({ ...wwobject3265984aeb924d73b702dbd0e4d1472e, name: 'wwobject-3265984a-eb92-4d73-b702-dbd0e4d1472e' }),
'wwobject-90cd6854-c213-4f06-806c-be321342389b': getInheritedConfiguration({ ...wwobject90cd6854c2134f06806cbe321342389b, name: 'wwobject-90cd6854-c213-4f06-806c-be321342389b' }),
'wwobject-5b61c2ee-96e3-402f-9f64-596f5e3002f2': getInheritedConfiguration({ ...wwobject5b61c2ee96e3402f9f64596f5e3002f2, name: 'wwobject-5b61c2ee-96e3-402f-9f64-596f5e3002f2' }),
'wwobject-85044fa4-8fc0-4115-9eaf-ca30a1b4b528': getInheritedConfiguration({ ...wwobject85044fa48fc041159eafca30a1b4b528, name: 'wwobject-85044fa4-8fc0-4115-9eaf-ca30a1b4b528' }),
'wwobject-5a88036f-22ea-4f8d-b4a5-bc226ef95061': getInheritedConfiguration({ ...wwobject5a88036f22ea4f8db4a5bc226ef95061, name: 'wwobject-5a88036f-22ea-4f8d-b4a5-bc226ef95061' }),
'wwobject-6d692ca2-6cdc-4805-aa0c-211102f335d0': getInheritedConfiguration({ ...wwobject6d692ca26cdc4805aa0c211102f335d0, name: 'wwobject-6d692ca2-6cdc-4805-aa0c-211102f335d0' }),
'wwobject-1b1e2173-9b78-42cc-a8ee-a6167caea340': getInheritedConfiguration({ ...wwobject1b1e21739b7842cca8eea6167caea340, name: 'wwobject-1b1e2173-9b78-42cc-a8ee-a6167caea340' }),
'wwobject-4ce97e36-71b1-48d5-b89d-ef045c0e939e': getInheritedConfiguration({ ...wwobject4ce97e3671b148d5b89def045c0e939e, name: 'wwobject-4ce97e36-71b1-48d5-b89d-ef045c0e939e' }),
'wwobject-6047b8df-81b7-45a7-a6b3-7355fb2fa3cd': getInheritedConfiguration({ ...wwobject6047b8df81b745a7a6b37355fb2fa3cd, name: 'wwobject-6047b8df-81b7-45a7-a6b3-7355fb2fa3cd' }),
'wwobject-9f3c91ad-1667-473e-b530-521daa099a14': getInheritedConfiguration({ ...wwobject9f3c91ad1667473eb530521daa099a14, name: 'wwobject-9f3c91ad-1667-473e-b530-521daa099a14' }),
'wwobject-5c57cd3e-0efb-451f-872a-17f0583ef682': getInheritedConfiguration({ ...wwobject5c57cd3e0efb451f872a17f0583ef682, name: 'wwobject-5c57cd3e-0efb-451f-872a-17f0583ef682' }),
'wwobject-97a63460-5c25-4d74-ac1f-86693c2e4a08': getInheritedConfiguration({ ...wwobject97a634605c254d74ac1f86693c2e4a08, name: 'wwobject-97a63460-5c25-4d74-ac1f-86693c2e4a08' }),
'wwobject-aa29a661-07ce-484e-8abb-456186211282': getInheritedConfiguration({ ...wwobjectaa29a66107ce484e8abb456186211282, name: 'wwobject-aa29a661-07ce-484e-8abb-456186211282' }),
'wwobject-57831abf-83ad-49ad-ba97-3bd30b035710': getInheritedConfiguration({ ...wwobject57831abf83ad49adba973bd30b035710, name: 'wwobject-57831abf-83ad-49ad-ba97-3bd30b035710' }),
'wwobject-59dca300-db78-42e4-a7a6-0cbf22d3cc82': getInheritedConfiguration({ ...wwobject59dca300db7842e4a7a60cbf22d3cc82, name: 'wwobject-59dca300-db78-42e4-a7a6-0cbf22d3cc82' }),
'wwobject-a6cb6a4d-6af7-4cd6-b530-a15d9ec64488': getInheritedConfiguration({ ...wwobjecta6cb6a4d6af74cd6b530a15d9ec64488, name: 'wwobject-a6cb6a4d-6af7-4cd6-b530-a15d9ec64488' }),
'wwobject-e2962a22-03b3-4421-b85e-906177d2303f': getInheritedConfiguration({ ...wwobjecte2962a2203b34421b85e906177d2303f, name: 'wwobject-e2962a22-03b3-4421-b85e-906177d2303f' }),
'wwobject-1ba25bdf-dee9-4e0e-a0b8-b3f3128c3b65': getInheritedConfiguration({ ...wwobject1ba25bdfdee94e0ea0b8b3f3128c3b65, name: 'wwobject-1ba25bdf-dee9-4e0e-a0b8-b3f3128c3b65' }),
'wwobject-d2eeb897-ad95-49e4-8394-fe3f5c9a81fb': getInheritedConfiguration({ ...wwobjectd2eeb897ad9549e48394fe3f5c9a81fb, name: 'wwobject-d2eeb897-ad95-49e4-8394-fe3f5c9a81fb' }),
'wwobject-60676ae5-99b1-4278-9330-4299cd99c5cf': getInheritedConfiguration({ ...wwobject60676ae599b1427893304299cd99c5cf, name: 'wwobject-60676ae5-99b1-4278-9330-4299cd99c5cf' }),
'wwobject-9ecb2cfc-cef7-4be8-b736-3e17a3b7e9ff': getInheritedConfiguration({ ...wwobject9ecb2cfccef74be8b7363e17a3b7e9ff, name: 'wwobject-9ecb2cfc-cef7-4be8-b736-3e17a3b7e9ff' }),
'wwobject-6145eb60-0af8-4e52-bcc6-dc0f6743654e': getInheritedConfiguration({ ...wwobject6145eb600af84e52bcc6dc0f6743654e, name: 'wwobject-6145eb60-0af8-4e52-bcc6-dc0f6743654e' }),
'wwobject-deb10a01-5eef-4aa1-9017-1b51c2ad6fd0': getInheritedConfiguration({ ...wwobjectdeb10a015eef4aa190171b51c2ad6fd0, name: 'wwobject-deb10a01-5eef-4aa1-9017-1b51c2ad6fd0' }),
'wwobject-985570fc-b3c0-4566-8004-82ab3b30a11d': getInheritedConfiguration({ ...wwobject985570fcb3c04566800482ab3b30a11d, name: 'wwobject-985570fc-b3c0-4566-8004-82ab3b30a11d' }),
'wwobject-a823467c-bdc7-4cec-a38c-71875c4c214a': getInheritedConfiguration({ ...wwobjecta823467cbdc74ceca38c71875c4c214a, name: 'wwobject-a823467c-bdc7-4cec-a38c-71875c4c214a' }),
'wwobject-9ae1fce8-2e31-4bfd-a4d2-0450235bdfd5': getInheritedConfiguration({ ...wwobject9ae1fce82e314bfda4d20450235bdfd5, name: 'wwobject-9ae1fce8-2e31-4bfd-a4d2-0450235bdfd5' }),
'wwobject-c6c0c00e-49fd-4cb9-bd78-5bc09945721e': getInheritedConfiguration({ ...wwobjectc6c0c00e49fd4cb9bd785bc09945721e, name: 'wwobject-c6c0c00e-49fd-4cb9-bd78-5bc09945721e' })};
    /* wwFront:end */
 
    return {
        configurations,
     };
});
