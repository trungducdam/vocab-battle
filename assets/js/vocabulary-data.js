// Dữ liệu được trích từ Tu_Vung_Tieng_Anh_A1_C1_da_lam_sach.docx.
// Các bản ghi trùng hoàn toàn trong cùng cấp độ đã được loại bỏ.
// Tổng: 200 từ nền; phân bố: {'A1': 50, 'A2': 50, 'B1': 50, 'B2': 50}.
const vocabularySeed = [
  {
    "id": 1,
    "word": "apple",
    "meaning": "quả táo",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 2,
    "word": "book",
    "meaning": "quyển sách",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 3,
    "word": "cat",
    "meaning": "con mèo",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 4,
    "word": "dog",
    "meaning": "con chó",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 5,
    "word": "house",
    "meaning": "ngôi nhà",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 6,
    "word": "water",
    "meaning": "nước",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 7,
    "word": "sun",
    "meaning": "mặt trời",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 8,
    "word": "moon",
    "meaning": "mặt trăng",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 9,
    "word": "pen",
    "meaning": "bút mực",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 10,
    "word": "car",
    "meaning": "xe hơi",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 11,
    "word": "tree",
    "meaning": "cây",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 12,
    "word": "food",
    "meaning": "thức ăn",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 13,
    "word": "mother",
    "meaning": "mẹ",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 14,
    "word": "father",
    "meaning": "bố",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 15,
    "word": "friend",
    "meaning": "bạn bè",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 16,
    "word": "school",
    "meaning": "trường học",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 17,
    "word": "happy",
    "meaning": "vui vẻ",
    "level": "A1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 18,
    "word": "big",
    "meaning": "to lớn",
    "level": "A1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 19,
    "word": "small",
    "meaning": "nhỏ bé",
    "level": "A1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 20,
    "word": "red",
    "meaning": "màu đỏ",
    "level": "A1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 21,
    "word": "blue",
    "meaning": "màu xanh dương",
    "level": "A1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 22,
    "word": "good",
    "meaning": "tốt",
    "level": "A1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 23,
    "word": "bad",
    "meaning": "xấu/tồi",
    "level": "A1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 24,
    "word": "run",
    "meaning": "chạy",
    "level": "A1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 25,
    "word": "walk",
    "meaning": "đi bộ",
    "level": "A1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 26,
    "word": "eat",
    "meaning": "ăn",
    "level": "A1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 27,
    "word": "drink",
    "meaning": "uống",
    "level": "A1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 28,
    "word": "sleep",
    "meaning": "ngủ",
    "level": "A1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 29,
    "word": "read",
    "meaning": "đọc",
    "level": "A1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 30,
    "word": "write",
    "meaning": "viết",
    "level": "A1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 31,
    "word": "boy",
    "meaning": "cậu bé",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 32,
    "word": "girl",
    "meaning": "cô bé",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 33,
    "word": "man",
    "meaning": "người đàn ông",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 34,
    "word": "woman",
    "meaning": "người phụ nữ",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 35,
    "word": "day",
    "meaning": "ngày",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 36,
    "word": "night",
    "meaning": "đêm",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 37,
    "word": "time",
    "meaning": "thời gian",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 38,
    "word": "name",
    "meaning": "tên",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 39,
    "word": "city",
    "meaning": "thành phố",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 40,
    "word": "country",
    "meaning": "đất nước",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 41,
    "word": "table",
    "meaning": "cái bàn",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 42,
    "word": "chair",
    "meaning": "cái ghế",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 43,
    "word": "door",
    "meaning": "cánh cửa",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 44,
    "word": "window",
    "meaning": "cửa sổ",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 45,
    "word": "bird",
    "meaning": "con chim",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 46,
    "word": "fish",
    "meaning": "con cá",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 47,
    "word": "milk",
    "meaning": "sữa",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 48,
    "word": "bread",
    "meaning": "bánh mì",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 49,
    "word": "family",
    "meaning": "gia đình",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 50,
    "word": "child",
    "meaning": "đứa trẻ",
    "level": "A1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 51,
    "word": "abroad",
    "meaning": "ở nước ngoài",
    "level": "A2",
    "partOfSpeech": "adv",
    "category": "Trạng từ"
  },
  {
    "id": 52,
    "word": "accident",
    "meaning": "tai nạn",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 53,
    "word": "activity",
    "meaning": "hoạt động",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 54,
    "word": "advice",
    "meaning": "lời khuyên",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 55,
    "word": "agree",
    "meaning": "đồng ý",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 56,
    "word": "airport",
    "meaning": "sân bay",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 57,
    "word": "amazing",
    "meaning": "kinh ngạc/tuyệt vời",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 58,
    "word": "amount",
    "meaning": "số lượng",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 59,
    "word": "angry",
    "meaning": "tức giận",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 60,
    "word": "appointment",
    "meaning": "cuộc hẹn",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 61,
    "word": "arrive",
    "meaning": "đến nơi",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 62,
    "word": "article",
    "meaning": "bài báo",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 63,
    "word": "aunt",
    "meaning": "cô/dì/bác gái",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 64,
    "word": "beautiful",
    "meaning": "đẹp",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 65,
    "word": "become",
    "meaning": "trở thành",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 66,
    "word": "borrow",
    "meaning": "vay/mượn",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 67,
    "word": "brave",
    "meaning": "dũng cảm",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 68,
    "word": "bridge",
    "meaning": "cây cầu",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 69,
    "word": "busy",
    "meaning": "bận rộn",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 70,
    "word": "camera",
    "meaning": "máy ảnh",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 71,
    "word": "capital",
    "meaning": "thủ đô",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 72,
    "word": "careful",
    "meaning": "cẩn thận",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 73,
    "word": "celebrate",
    "meaning": "kỷ niệm/ăn mừng",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 74,
    "word": "cheap",
    "meaning": "rẻ",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 75,
    "word": "choose",
    "meaning": "chọn",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 76,
    "word": "climb",
    "meaning": "leo/trèo",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 77,
    "word": "clothes",
    "meaning": "quần áo",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 78,
    "word": "company",
    "meaning": "công ty",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 79,
    "word": "compare",
    "meaning": "so sánh",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 80,
    "word": "cook",
    "meaning": "nấu ăn",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 81,
    "word": "cousin",
    "meaning": "anh chị em họ",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 82,
    "word": "danger",
    "meaning": "sự nguy hiểm",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 83,
    "word": "decide",
    "meaning": "quuyết định",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 84,
    "word": "describe",
    "meaning": "mô tả",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 85,
    "word": "dictionary",
    "meaning": "từ điển",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 86,
    "word": "different",
    "meaning": "khác biệt",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 87,
    "word": "difficult",
    "meaning": "khó khăn",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 88,
    "word": "doctor",
    "meaning": "bác sĩ",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 89,
    "word": "driver",
    "meaning": "tài xế",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 90,
    "word": "easily",
    "meaning": "một cách dễ dàng",
    "level": "A2",
    "partOfSpeech": "adv",
    "category": "Trạng từ"
  },
  {
    "id": 91,
    "word": "expensive",
    "meaning": "đắt đỏ",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 92,
    "word": "explain",
    "meaning": "giải thích",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 93,
    "word": "famous",
    "meaning": "nổi tiếng",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 94,
    "word": "favorite",
    "meaning": "yêu thích",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 95,
    "word": "forget",
    "meaning": "quên",
    "level": "A2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 96,
    "word": "future",
    "meaning": "tương lai",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 97,
    "word": "garden",
    "meaning": "khu vườn",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 98,
    "word": "healthy",
    "meaning": "khỏe mạnh",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 99,
    "word": "important",
    "meaning": "quan trọng",
    "level": "A2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 100,
    "word": "journey",
    "meaning": "chuyến đi",
    "level": "A2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 101,
    "word": "ability",
    "meaning": "khả năng",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 102,
    "word": "absolute",
    "meaning": "tuyệt đối",
    "level": "B1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 103,
    "word": "academic",
    "meaning": "thuộc học thuật",
    "level": "B1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 104,
    "word": "accept",
    "meaning": "chấp nhận",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 105,
    "word": "access",
    "meaning": "truy cập/tiếp cận",
    "level": "B1",
    "partOfSpeech": "n/v",
    "category": "Danh từ / Động từ"
  },
  {
    "id": 106,
    "word": "accommodation",
    "meaning": "chỗ ở",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 107,
    "word": "achieve",
    "meaning": "đạt được",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 108,
    "word": "actress",
    "meaning": "nữ diễn viên",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 109,
    "word": "advantage",
    "meaning": "lợi thế",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 110,
    "word": "adventure",
    "meaning": "cuộc phiêu lưu",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 111,
    "word": "advertise",
    "meaning": "quảng cáo",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 112,
    "word": "affect",
    "meaning": "ảnh hưởng",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 113,
    "word": "afford",
    "meaning": "có khả năng chi trả",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 114,
    "word": "agreement",
    "meaning": "thỏa thuận",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 115,
    "word": "allow",
    "meaning": "cho phép",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 116,
    "word": "ambition",
    "meaning": "hoài bão",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 117,
    "word": "analyze",
    "meaning": "phân tích",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 118,
    "word": "announce",
    "meaning": "thông báo",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 119,
    "word": "annoying",
    "meaning": "phiền phức",
    "level": "B1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 120,
    "word": "anxiety",
    "meaning": "sự lo âu",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 121,
    "word": "apologize",
    "meaning": "xin lỗi",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 122,
    "word": "appearance",
    "meaning": "diện mạo",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 123,
    "word": "application",
    "meaning": "đơn xin/ứng dụng",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 124,
    "word": "arrange",
    "meaning": "sắp xếp",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 125,
    "word": "artificial",
    "meaning": "nhân tạo",
    "level": "B1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 126,
    "word": "attract",
    "meaning": "thu hút",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 127,
    "word": "audience",
    "meaning": "khán giả",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 128,
    "word": "available",
    "meaning": "có sẵn",
    "level": "B1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 129,
    "word": "background",
    "meaning": "nền tảng",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 130,
    "word": "behavior",
    "meaning": "hành vi",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 131,
    "word": "benefit",
    "meaning": "lợi ích",
    "level": "B1",
    "partOfSpeech": "n/v",
    "category": "Danh từ / Động từ"
  },
  {
    "id": 132,
    "word": "boundary",
    "meaning": "ranh giới",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 133,
    "word": "candidate",
    "meaning": "ứng viên",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 134,
    "word": "career",
    "meaning": "sự nghiệp",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 135,
    "word": "century",
    "meaning": "thế kỷ",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 136,
    "word": "certain",
    "meaning": "chắc chắn",
    "level": "B1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 137,
    "word": "character",
    "meaning": "tính cách/nhân vật",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 138,
    "word": "community",
    "meaning": "cộng đồng",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 139,
    "word": "condition",
    "meaning": "điều kiện",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 140,
    "word": "consider",
    "meaning": "cân nhắc",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 141,
    "word": "continue",
    "meaning": "tiếp tục",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 142,
    "word": "convince",
    "meaning": "thuyết phục",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 143,
    "word": "creative",
    "meaning": "sáng tạo",
    "level": "B1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 144,
    "word": "culture",
    "meaning": "văn hóa",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 145,
    "word": "decision",
    "meaning": "quuyết định",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 146,
    "word": "develop",
    "meaning": "phát triển",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 147,
    "word": "discover",
    "meaning": "khám phá",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 148,
    "word": "discuss",
    "meaning": "thảo luận",
    "level": "B1",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 149,
    "word": "economic",
    "meaning": "thuộc kinh tế",
    "level": "B1",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 150,
    "word": "education",
    "meaning": "giáo dục",
    "level": "B1",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 151,
    "word": "abandon",
    "meaning": "từ bỏ/bỏ rơi",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 152,
    "word": "abundant",
    "meaning": "dồi dào",
    "level": "B2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 153,
    "word": "academic",
    "meaning": "mang tính học thuật",
    "level": "B2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 154,
    "word": "accommodate",
    "meaning": "cung cấp chỗ ở",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 155,
    "word": "accumulate",
    "meaning": "tích lũy",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 156,
    "word": "accurate",
    "meaning": "chính xác",
    "level": "B2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 157,
    "word": "adequate",
    "meaning": "đầy đủ/thích đáng",
    "level": "B2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 158,
    "word": "advocate",
    "meaning": "ủng hộ/người ủng hộ",
    "level": "B2",
    "partOfSpeech": "v/n",
    "category": "Động từ / Danh từ"
  },
  {
    "id": 159,
    "word": "allocate",
    "meaning": "phân bổ",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 160,
    "word": "alter",
    "meaning": "thay đổi",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 161,
    "word": "ambiguous",
    "meaning": "mơ hồ/mập mờ",
    "level": "B2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 162,
    "word": "analyze",
    "meaning": "phân tích chi tiết",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 163,
    "word": "anticipate",
    "meaning": "dự đoán",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 164,
    "word": "apparent",
    "meaning": "ro ràng/hiển nhiên",
    "level": "B2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 165,
    "word": "appreciate",
    "meaning": "đánh giá cao/cảm kích",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 166,
    "word": "approach",
    "meaning": "tiếp cận",
    "level": "B2",
    "partOfSpeech": "n/v",
    "category": "Danh từ / Động từ"
  },
  {
    "id": 167,
    "word": "artificial",
    "meaning": "nhân tạo",
    "level": "B2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 168,
    "word": "assert",
    "meaning": "khẳng định",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 169,
    "word": "assess",
    "meaning": "đánh giá",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 170,
    "word": "assume",
    "meaning": "giả định",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 171,
    "word": "attribute",
    "meaning": "quy cho/thuộc tính",
    "level": "B2",
    "partOfSpeech": "v/n",
    "category": "Động từ / Danh từ"
  },
  {
    "id": 172,
    "word": "clarify",
    "meaning": "làm rõ",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 173,
    "word": "coincide",
    "meaning": "trùng hợp",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 174,
    "word": "collapse",
    "meaning": "sụp đổ",
    "level": "B2",
    "partOfSpeech": "v/n",
    "category": "Động từ / Danh từ"
  },
  {
    "id": 175,
    "word": "commence",
    "meaning": "bắt đầu",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 176,
    "word": "compensate",
    "meaning": "đền bù",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 177,
    "word": "comply",
    "meaning": "tuân thủ",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 178,
    "word": "comprise",
    "meaning": "bao gồm",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 179,
    "word": "conceive",
    "meaning": "hình thành trong đầu",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 180,
    "word": "conclude",
    "meaning": "kết luận",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 181,
    "word": "conduct",
    "meaning": "tiến hành/hành vi",
    "level": "B2",
    "partOfSpeech": "v/n",
    "category": "Động từ / Danh từ"
  },
  {
    "id": 182,
    "word": "consequence",
    "meaning": "hậu quả",
    "level": "B2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 183,
    "word": "considerable",
    "meaning": "đáng kể",
    "level": "B2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 184,
    "word": "consistent",
    "meaning": "nhất quán",
    "level": "B2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 185,
    "word": "constitute",
    "meaning": "cấu thành",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 186,
    "word": "constrain",
    "meaning": "ràng buộc",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 187,
    "word": "contribute",
    "meaning": "đóng góp",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 188,
    "word": "controversy",
    "meaning": "tranh cãi",
    "level": "B2",
    "partOfSpeech": "n",
    "category": "Danh từ"
  },
  {
    "id": 189,
    "word": "crucial",
    "meaning": "quan trọng cốt yếu",
    "level": "B2",
    "partOfSpeech": "adj",
    "category": "Tính từ"
  },
  {
    "id": 190,
    "word": "demonstrate",
    "meaning": "chứng minh",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 191,
    "word": "depict",
    "meaning": "mô tả/khắc họa",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 192,
    "word": "derive",
    "meaning": "bắt nguồn từ",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 193,
    "word": "diminish",
    "meaning": "giảm bớt",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 194,
    "word": "distribute",
    "meaning": "phân phối",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 195,
    "word": "dominate",
    "meaning": "thống trị",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 196,
    "word": "elaborate",
    "meaning": "phức tạp/giải thích thêm",
    "level": "B2",
    "partOfSpeech": "v/adj",
    "category": "v/adj"
  },
  {
    "id": 197,
    "word": "eliminate",
    "meaning": "loại bỏ",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 198,
    "word": "enhance",
    "meaning": "nâng cao",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 199,
    "word": "evaluate",
    "meaning": "đánh giá",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  },
  {
    "id": 200,
    "word": "exaggerate",
    "meaning": "phóng đại",
    "level": "B2",
    "partOfSpeech": "v",
    "category": "Động từ"
  }
];
