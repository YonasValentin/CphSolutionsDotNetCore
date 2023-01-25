import dayjs from "dayjs";

export const prettyDate = (date: string | null | undefined) => dayjs(date).format("D.MM.YYYY");
