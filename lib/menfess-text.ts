import { briefFamsData } from "@/modules/fams-data";

function formatMenfessName(value: string) {
  const famName = briefFamsData.find(
    (fam) => fam.id === value.replace("fams/", ""),
  )?.["full-name"];

  return famName ? `${famName} CSUI24` : value;
}

export function formatMenfessText(from: string, to: string, message: string) {
  return `From : ${formatMenfessName(from)}\nTo : ${formatMenfessName(to)}\n\n${message}`;
}

export function getMenfessTextLength(
  from: string,
  to: string,
  message: string,
) {
  return formatMenfessText(from, to, message).length;
}
