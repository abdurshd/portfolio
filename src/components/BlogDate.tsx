import { parseISO, format } from "date-fns";
import {ReactElement} from "react";

export default function BlogDate({ dateString }:{dateString: string}): ReactElement {
  if (!dateString) return <div />;

  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLL	d, yyyy")}</time>;
}
