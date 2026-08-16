// 100 idioms và ví dụ được trích từ tài liệu Word do người dùng cung cấp.
const idiomSeed = [
  {
    "id": "idiom-1",
    "word": "A piece of cake",
    "meaning": "Dễ ợt, dễ như ăn bánh",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "The exam was a piece of cake."
  },
  {
    "id": "idiom-2",
    "word": "Break a leg",
    "meaning": "Chúc may mắn (thường dùng trong biểu diễn)",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Break a leg at your performance tonight!"
  },
  {
    "id": "idiom-3",
    "word": "Once in a blue moon",
    "meaning": "Hiếm khi, rất ít khi",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "I only see him once in a blue moon."
  },
  {
    "id": "idiom-4",
    "word": "When pigs fly",
    "meaning": "Điều không bao giờ xảy ra",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "He will clean his room when pigs fly."
  },
  {
    "id": "idiom-5",
    "word": "Bite the bullet",
    "meaning": "Cắn răng chịu đựng, đối mặt với khó khăn",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "I decided to bite the bullet and go to the dentist."
  },
  {
    "id": "idiom-6",
    "word": "Call it a day",
    "meaning": "Nghỉ tay, kết thúc một ngày làm việc",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Let's call it a day and go home."
  },
  {
    "id": "idiom-7",
    "word": "Costs an arm and a leg",
    "meaning": "Rất đắt đỏ",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "That sports car costs an arm and a leg."
  },
  {
    "id": "idiom-8",
    "word": "Hit the nail on the head",
    "meaning": "Nói đúng trọng tâm, chuẩn xác",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "You hit the nail on the head with that analysis."
  },
  {
    "id": "idiom-9",
    "word": "Under the weather",
    "meaning": "Cảm thấy không khỏe, mệt mỏi",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "I'm feeling a bit under the weather today."
  },
  {
    "id": "idiom-10",
    "word": "Spill the beans",
    "meaning": "Tiết lộ bí mật",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Who spilled the beans about the surprise party?"
  },
  {
    "id": "idiom-11",
    "word": "Let the cat out of the bag",
    "meaning": "Làm lộ bí mật vô tình",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "She let the cat out of the bag about our trip."
  },
  {
    "id": "idiom-12",
    "word": "Burn the midnight oil",
    "meaning": "Thức khuya làm việc/học tập",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "He's burning the midnight oil for exams."
  },
  {
    "id": "idiom-13",
    "word": "Catch someone's eye",
    "meaning": "Thu hút sự chú ý của ai",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "The shiny ring caught my eye."
  },
  {
    "id": "idiom-14",
    "word": "Cross your fingers",
    "meaning": "Cầu mong may mắn",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Cross your fingers for me!"
  },
  {
    "id": "idiom-15",
    "word": "Every cloud has a silver lining",
    "meaning": "Trong cái rủi có cái may",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Don't lose hope; every cloud has a silver lining."
  },
  {
    "id": "idiom-16",
    "word": "In the same boat",
    "meaning": "Cùng chung hoàn cảnh khó khăn",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "We are all in the same boat during this crisis."
  },
  {
    "id": "idiom-17",
    "word": "Kill two birds with one stone",
    "meaning": "Một mũi tên trúng hai đích",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "I killed two birds with one stone by visiting them on my work trip."
  },
  {
    "id": "idiom-18",
    "word": "On cloud nine",
    "meaning": "Cực kỳ hạnh phúc",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "She was on cloud nine after winning."
  },
  {
    "id": "idiom-19",
    "word": "Piece of the pie",
    "meaning": "Một phần lợi ích/lợi nhuận",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Everyone wants a piece of the pie."
  },
  {
    "id": "idiom-20",
    "word": "Rain cats and dogs",
    "meaning": "Mưa tầm tã",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "It's raining cats and dogs outside."
  },
  {
    "id": "idiom-21",
    "word": "Through thick and thin",
    "meaning": "Bất chấp mọi khó khăn, luôn bên nhau",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "They stayed together through thick and thin."
  },
  {
    "id": "idiom-22",
    "word": "Time flies",
    "meaning": "Thời gian trôi nhanh",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Time flies when you're having fun."
  },
  {
    "id": "idiom-23",
    "word": "Action speaks louder than words",
    "meaning": "Hành động có giá trị hơn lời nói",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Don't just promise; action speaks louder than words."
  },
  {
    "id": "idiom-24",
    "word": "Add fuel to the fire",
    "meaning": "Thêm dầu vào lửa",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Shouting will only add fuel to the fire."
  },
  {
    "id": "idiom-25",
    "word": "Barking up the wrong tree",
    "meaning": "Nhầm lẫn, tìm giải pháp sai chỗ",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "If you think I stole it, you're barking up the wrong tree."
  },
  {
    "id": "idiom-26",
    "word": "Beat around the bush",
    "meaning": "Vòng vo tam quốc",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Stop beating around the bush and tell me the truth."
  },
  {
    "id": "idiom-27",
    "word": "Bite off more than you can chew",
    "meaning": "Ôm ôm quá nhiều việc so với khả năng",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Don't bite off more than you can chew."
  },
  {
    "id": "idiom-28",
    "word": "Blow off steam",
    "meaning": "Giải tỏa căng thẳng/cơn giận",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "He went for a run to blow off steam."
  },
  {
    "id": "idiom-29",
    "word": "Break the ice",
    "meaning": "Làm tan băng bầu không khí, khởi đầu cuộc trò chuyện",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "A joke helps break the ice."
  },
  {
    "id": "idiom-30",
    "word": "Burn bridges",
    "meaning": "Phá hỏng mối quan hệ không thể cứu vãn",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Never burn bridges when leaving a company."
  },
  {
    "id": "idiom-31",
    "word": "By the skin of one's teeth",
    "meaning": "Sát nút, suýt soát",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "He passed the test by the skin of his teeth."
  },
  {
    "id": "idiom-32",
    "word": "Compare apples and oranges",
    "meaning": "So sánh khập khễnh",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "You can't compare their styles; it's apples and oranges."
  },
  {
    "id": "idiom-33",
    "word": "Cry over spilt milk",
    "meaning": "Hối hận vì chuyện đã qua",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "There's no use crying over spilt milk."
  },
  {
    "id": "idiom-34",
    "word": "Curiosity killed the cat",
    "meaning": "Tò mò hại thân",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Don't ask too many questions; curiosity killed the cat."
  },
  {
    "id": "idiom-35",
    "word": "Cut corners",
    "meaning": "Làm qua loa, đi tắt tắt giảm chi phí/ chất lượng",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "They cut corners to finish the building fast."
  },
  {
    "id": "idiom-36",
    "word": "Devil's advocate",
    "meaning": "Người đưa ra ý kiến trái chiều để tranh luận",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Let me play devil's advocate for a moment."
  },
  {
    "id": "idiom-37",
    "word": "Don't count your chickens before they hatch",
    "meaning": "Đừng đếm chân vịt trước khi trứng nở",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Wait for final approval; don't count your chickens."
  },
  {
    "id": "idiom-38",
    "word": "Don't judge a book by its cover",
    "meaning": "Đừng đánh giá qua vẻ bề ngoài",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "He looks scary, but don't judge a book by its cover."
  },
  {
    "id": "idiom-39",
    "word": "Face the music",
    "meaning": "Chấp nhận hậu quả/sự thật phũ phàng",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "He committed the error, now he must face the music."
  },
  {
    "id": "idiom-40",
    "word": "Get out of hand",
    "meaning": "Vượt tầm kiểm soát",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "The party got out of hand quickly."
  },
  {
    "id": "idiom-41",
    "word": "Get your act together",
    "meaning": "Chỉnh đốn lại bản thân, làm việc đàng hoàng",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "You need to get your act together if you want to keep this job."
  },
  {
    "id": "idiom-42",
    "word": "Give the benefit of the doubt",
    "meaning": "Tạm thời tin tưởng ai đó",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "I gave him the benefit of the doubt."
  },
  {
    "id": "idiom-43",
    "word": "Go the extra mile",
    "meaning": "Nỗ lực hơn mức mong đợi",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "She always goes the extra mile for clients."
  },
  {
    "id": "idiom-44",
    "word": "Hit the sack",
    "meaning": "Đi ngủ",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "I'm exhausted, time to hit the sack."
  },
  {
    "id": "idiom-45",
    "word": "Ignorance is bliss",
    "meaning": "Không biết thì không đau/ngu dốt là hạnh phúc",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Sometimes ignorance is bliss."
  },
  {
    "id": "idiom-46",
    "word": "It takes two to tango",
    "meaning": "Cần cả hai bên cùng hợp tác/chịu trách nhiệm",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Don't blame just him; it takes two to tango."
  },
  {
    "id": "idiom-47",
    "word": "Jump on the bandwagon",
    "meaning": "Chạy theo xu hướng/phong trào",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Many companies jump on the AI bandwagon."
  },
  {
    "id": "idiom-48",
    "word": "Keep an eye on",
    "meaning": "Để mắt tới, để ý",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Please keep an eye on my luggage."
  },
  {
    "id": "idiom-49",
    "word": "Let sleeping dogs lie",
    "meaning": "Đừng gợi lại chuyện cũ bực mình",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Don't mention it again; let sleeping dogs lie."
  },
  {
    "id": "idiom-50",
    "word": "Method to one's madness",
    "meaning": "Có lý do riêng cho hành động kỳ quặc",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "He looks chaotic, but there's method to his madness."
  },
  {
    "id": "idiom-51",
    "word": "Off the top of my head",
    "meaning": "Nói ngay không cần suy nghĩ kỹ",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Off the top of my head, I'd say about 50 people."
  },
  {
    "id": "idiom-52",
    "word": "On the fence",
    "meaning": "Lưỡng lự, chưa quyết định",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "I'm on the fence about changing jobs."
  },
  {
    "id": "idiom-53",
    "word": "Pull someone's leg",
    "meaning": "Trêu chọc, giỡn ai đó",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Don't worry, I'm just pulling your leg."
  },
  {
    "id": "idiom-54",
    "word": "Put all your eggs in one basket",
    "meaning": "Dồn hết vốn/nguồn lực vào một chỗ",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Diversify your investments; don't put all eggs in one basket."
  },
  {
    "id": "idiom-55",
    "word": "Sat on the fence",
    "meaning": "Không chọn bên nào trong cuộc tranh luận",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "He sat on the fence during the argument."
  },
  {
    "id": "idiom-56",
    "word": "See eye to eye",
    "meaning": "Đồng quan điểm với ai",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "My boss and I don't always see eye to eye."
  },
  {
    "id": "idiom-57",
    "word": "Sit tight",
    "meaning": "Kiên nhẫn chờ đợi",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Sit tight, the doctor will see you soon."
  },
  {
    "id": "idiom-58",
    "word": "Speak of the devil",
    "meaning": "Vừa nói tới thì xuất hiện",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Speak of the devil! We were just talking about you."
  },
  {
    "id": "idiom-59",
    "word": "Steal someone's thunder",
    "meaning": "Cướp sự chú ý/công lao của ai",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "She stole my thunder by announcing her news first."
  },
  {
    "id": "idiom-60",
    "word": "Take it with a grain of salt",
    "meaning": "Nghi ngờ, không tin hoàn toàn",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Take his stories with a grain of salt."
  },
  {
    "id": "idiom-61",
    "word": "The ball is in your court",
    "meaning": "Tới lượt bạn quyết định/hành động",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "The ball is in your court now, so please make a decision."
  },
  {
    "id": "idiom-62",
    "word": "The elephant in the room",
    "meaning": "Vấn đề lớn ai cũng biết nhưng né tránh",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "We need to address the elephant in the room."
  },
  {
    "id": "idiom-63",
    "word": "The best of both worlds",
    "meaning": "Vừa được cái này vừa được cái kia",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Living in the suburbs gives you the best of both worlds."
  },
  {
    "id": "idiom-64",
    "word": "Throw cold water on",
    "meaning": "Dội gáo nước lạnh vào ý tưởng/kế hoạch",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "He threw cold water on our proposed project."
  },
  {
    "id": "idiom-65",
    "word": "Wrap one's head around",
    "meaning": "Hiểu được một điều gì đó phức tạp",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "I can't wrap my head around this theory."
  },
  {
    "id": "idiom-66",
    "word": "You can say that again",
    "meaning": "Rất đồng ý với lời bạn nói",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Weather is great! - You can say that again."
  },
  {
    "id": "idiom-67",
    "word": "A blessing in disguise",
    "meaning": "Trong cái rủi có cái may / Họa hóa phúc",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Losing that job was a blessing in disguise."
  },
  {
    "id": "idiom-68",
    "word": "A dime a dozen",
    "meaning": "Rất phổ biến, không có gì đặc biệt",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Cheap plastic toys are a dime a dozen."
  },
  {
    "id": "idiom-69",
    "word": "Beat a dead horse",
    "meaning": "Làm chuyện vô ích",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Trying to fix this broken car is beating a dead horse."
  },
  {
    "id": "idiom-70",
    "word": "Bite the dust",
    "meaning": "Thất bại, chết, hỏng hóc",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "My old laptop finally bit the dust."
  },
  {
    "id": "idiom-71",
    "word": "Burn the candle at both ends",
    "meaning": "Làm việc quá sức cả ngày lẫn đêm",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Working two jobs means burning the candle at both ends."
  },
  {
    "id": "idiom-72",
    "word": "Cast pearls before swine",
    "meaning": "Đàn gảy tai trâu",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Explaining classical music to him is casting pearls before swine."
  },
  {
    "id": "idiom-73",
    "word": "Caught between a rock and a hard place",
    "meaning": "Tiến luái lưỡng nan",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "I was caught between a rock and a hard place."
  },
  {
    "id": "idiom-74",
    "word": "Chasing rainbows",
    "meaning": "Theo đuổi điều viển vông",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Stop chasing rainbows and get a real job."
  },
  {
    "id": "idiom-75",
    "word": "Come hell or high water",
    "meaning": "Dù có chuyện gì xảy ra đi nữa",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "I will finish this project, come hell or high water."
  },
  {
    "id": "idiom-76",
    "word": "Cut to the chase",
    "meaning": "Đi thẳng vào vấn đề chính",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Let's cut to the chase: how much will it cost?"
  },
  {
    "id": "idiom-77",
    "word": "Drive someone up the wall",
    "meaning": "Làm ai đó phát điên",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "That loud music is driving me up the wall."
  },
  {
    "id": "idiom-78",
    "word": "Fly off the handle",
    "meaning": "Mất bình tĩnh, nổi giận bất ngờ",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "He flew off the handle over a minor detail."
  },
  {
    "id": "idiom-79",
    "word": "Go down in flames",
    "meaning": "Thất bại thảm hại",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "The new marketing campaign went down in flames."
  },
  {
    "id": "idiom-80",
    "word": "Hit the roof",
    "meaning": "Tức giận dữ dội",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Dad hit the roof when he saw the broken window."
  },
  {
    "id": "idiom-81",
    "word": "In the pipeline",
    "meaning": "Đang trong quá trình chuẩn bị/thực hiện",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "We have exciting new features in the pipeline."
  },
  {
    "id": "idiom-82",
    "word": "Jump the gun",
    "meaning": "Hành động quá sớm, vội vã",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Don't jump the gun before getting all instructions."
  },
  {
    "id": "idiom-83",
    "word": "Keep your chin up",
    "meaning": "Giữ vững tinh thần, không nản lòng",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Keep your chin up, things will improve."
  },
  {
    "id": "idiom-84",
    "word": "Leave no stone unturned",
    "meaning": "Tìm kiếm khắp nơi, không bỏ sót điều gì",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "The police left no stone unturned."
  },
  {
    "id": "idiom-85",
    "word": "Make ends meet",
    "meaning": "Trang trải cuộc sống",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "It's tough to make ends meet on a minimum wage."
  },
  {
    "id": "idiom-86",
    "word": "Not my cup of tea",
    "meaning": "Không phải gu/sở thích của tôi",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Horror movies are not my cup of tea."
  },
  {
    "id": "idiom-87",
    "word": "Off the beaten track",
    "meaning": "Ở nơi hẻo lánh, ít người biết đến",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "We found a lovely hotel off the beaten track."
  },
  {
    "id": "idiom-88",
    "word": "On the spur of the moment",
    "meaning": "Quyết định tức thì, không tính trước",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "We booked the trip on the spur of the moment."
  },
  {
    "id": "idiom-89",
    "word": "Out of the blue",
    "meaning": "Bất ngờ, không báo trước",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "She called me out of the blue after five years."
  },
  {
    "id": "idiom-90",
    "word": "Play fast and loose",
    "meaning": "Hành động thiếu trách nhiệm, cẩu thả",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "You shouldn't play fast and loose with financial rules."
  },
  {
    "id": "idiom-91",
    "word": "Put the cart before the horse",
    "meaning": "Cầm đèn chạy trước ô tô / Làm ngược quy trình",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Buying furniture before finding a house is putting the cart before the horse."
  },
  {
    "id": "idiom-92",
    "word": "Reading between the lines",
    "meaning": "Hiểu được ẩn ý",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Reading between the lines, she isn't happy here."
  },
  {
    "id": "idiom-93",
    "word": "Skeleton in the closet",
    "meaning": "Bí mật đen tối giấu kín",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Every family has a skeleton in the closet."
  },
  {
    "id": "idiom-94",
    "word": "Spill the tea",
    "meaning": "Tám chuyện, chia sẻ tin đồn",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Come sit down and spill the tea!"
  },
  {
    "id": "idiom-95",
    "word": "Take the bull by the horns",
    "meaning": "Trực tiếp đối mặt khó khăn",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "He took the bull by the horns and solved the crisis."
  },
  {
    "id": "idiom-96",
    "word": "The tip of the iceberg",
    "meaning": "Phần nổi của tảng băng chìm",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "These recorded crimes are just the tip of the iceberg."
  },
  {
    "id": "idiom-97",
    "word": "Throw in the towel",
    "meaning": "Đầu hàng, bỏ cuộc",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "After three failed attempts, he threw in the towel."
  },
  {
    "id": "idiom-98",
    "word": "Up in the air",
    "meaning": "Chưa chắc chắn, chưa được quyết định",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "Our travel plans are still up in the air."
  },
  {
    "id": "idiom-99",
    "word": "Water under the bridge",
    "meaning": "Chuyện cũ đã qua, không cần bận tâm",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "We had disagreements, but that's water under the bridge now."
  },
  {
    "id": "idiom-100",
    "word": "Weather the storm",
    "meaning": "Vượt qua giai đoạn khó khăn",
    "level": "IDIOM",
    "partOfSpeech": "idiom",
    "category": "Idiom",
    "example": "The company managed to weather the financial storm."
  }
];
