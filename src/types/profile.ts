export interface ProfileBody {
  name: string;
  profilePhoto: string;
  status?: "pending" | "published";
}
