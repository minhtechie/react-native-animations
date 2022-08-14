export interface Dummy {
  id: number;
}

const dummyData: Dummy[] = [];

for (let i = 0; i < 50; i++) {
  dummyData.push({
    id: i
  });
}

export default dummyData;
