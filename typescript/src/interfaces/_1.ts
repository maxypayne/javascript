interface LabeledValue {
  label: string;
}
const obj = { label : '20' };

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

printLabel(obj)

