export interface NoteModel {
  id: string | null,
  groupCode: string | null,
  courseCode: string | null,
  fivesQuantity: number | null,
  foursQuantity: number | null,
  threesQuantity: number | null,
  twosQuantity: number | null,
  missedLectionsQuantity: number | null,
  missedPracticesQuantity: number | null,
}
