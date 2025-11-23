// "use client";

// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { fetchQuestions } from "@/store/slices/getQuestionsSlice";
// import { Typography, Row, Button, CardWrapper } from "@/components/atoms";
// import Stepper from "@/components/organisams/Stepper";
// import Divider from "../../components/atoms/Divider";

// export default function QuestionList() {
//   const dispatch = useAppDispatch();
//   const { questions, loading, error, totalPages } = useAppSelector(
//     (state) => state.questionsList
//   );

//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     dispatch(fetchQuestions({ page: currentPage, limit: 1 }));
//   }, [dispatch, currentPage]);

//   return (
//     <div className="mt-6">
//       <Typography variant="2xl" weight="bold">
//         Questions List
//       </Typography>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-alert text-sm">Error: {error}</p>}

//       {questions.length > 0 && (
//         <CardWrapper className="mt-4">
//           <Stepper current={currentPage} total={totalPages} />
//           <Divider className="mb-4" />
//           <CardWrapper
//             noBorder
//             noShadow
//             className="p-0 flex flex-col items-center"
//           >
//             <Typography variant="lg" weight="bold">
//               {questions[0].questionText}
//             </Typography>

//             <div className="mt-4 space-y-3 h-40">
//               {questions[0].options.map((opt: string, i: number) => {
//                 const label = String.fromCharCode(65 + i);

//                 return (
//                   <Row key={i} className="justify-start gap-3">
//                     <div className="w-8 h-8 cursor-pointer rounded-full bg-fog border border-smoke flex items-center justify-center font-semibold">
//                       {label}
//                     </div>
//                     <Typography className="cursor-pointer">{opt}</Typography>
//                   </Row>
//                 );
//               })}
//             </div>
//           </CardWrapper>
//           <Divider className="mt-6" />
//           <Row className="mt-4 gap-4 items-center">
//             <div></div>

//             <Typography>
//               {currentPage} / {totalPages}
//             </Typography>

//             <Row className="gap-2">
//               {currentPage >= totalPages && (
//                 <Button
//                   text="Completed"
//                   disabled={currentPage >= totalPages}
//                   variant="reject"
//                 />
//               )}
//               <Button
//                 text="Next"
//                 disabled={currentPage >= totalPages}
//                 className="disabled:bg-silver disabled:cursor-not-allowed"
//                 onClick={() => setCurrentPage((p) => p + 1)}
//               />
//             </Row>
//           </Row>
//         </CardWrapper>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { fetchQuestions } from "@/store/slices/getQuestionsSlice";
// import { submitAnswer, resetSubmitAnswer } from "@/store/slices/submitAnswerSlice";
// import { Typography, Row, Button, CardWrapper } from "@/components/atoms";
// import Stepper from "@/components/organisams/Stepper";
// import Divider from "@/components/atoms/Divider";

// export default function QuestionList() {
//   const dispatch = useAppDispatch();
//   const { questions, loading, error, totalPages } = useAppSelector(
//     (state) => state.questionsList
//   );
//   const { userAnswer, correctAnswer, loading: submitLoading } = useAppSelector(
//     (state) => state.submitAnswer
//   );

//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch question & reset answer on page change
//   useEffect(() => {
//     dispatch(fetchQuestions({ page: currentPage, limit: 1 }));
//     dispatch(resetSubmitAnswer());
//   }, [dispatch, currentPage]);

//   const handleAnswer = (answer: string, questionId: number) => {
//     if (userAnswer) return; // prevent multiple clicks
//     dispatch(submitAnswer({ questionId, userAnswer: answer }));
//   };

//   const question = questions[0];

//   return (
//     <div className="mt-6 p-4">
//       <Typography variant="2xl" weight="bold">
//         {question ? 'Questions List' : 'There is no quiz at this moment'}
//       </Typography>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500 text-sm">Error: {error}</p>}

//       {question && (
//         <CardWrapper className="mt-4 p-4 flex flex-col items-center gap-4">
//           <Stepper current={currentPage} total={totalPages} />
//           <Divider className="mb-4" />

//           <Typography variant="lg" weight="bold" className="text-center">
//             {question.questionText}
//           </Typography>

//           <div className="mt-4 w-full space-y-3">
//             {question.options.map((opt: string, i: number) => {
//               const label = String.fromCharCode(65 + i);

//               // Determine background/text color
//               let bgClass = "bg-fog border-smoke text-black cursor-pointer";
//               let textClass = "";

//               if (userAnswer) {
//                 if (opt === correctAnswer) {
//                   bgClass = "bg-success border-success";
//                   textClass = "text-success";
//                 } else if (opt === userAnswer && userAnswer !== correctAnswer) {
//                   bgClass = "bg-alert border-alert";
//                   textClass = "text-alert";
//                 } else {
//                   bgClass = "bg-fog border-smoke text-black cursor-not-allowed";
//                 }
//               }

//               return (
//                 <Row
//                   key={i}
//                   className="justify-center items-center gap-3"
//                   onClick={() => handleAnswer(opt, question.id)}
//                 >
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border ${bgClass}`}
//                   >
//                     {label}
//                   </div>
//                   <Typography className={`font-semibold ${textClass}`}>
//                     {opt}
//                   </Typography>
//                 </Row>
//               );
//             })}
//           </div>

//           <Divider className="mt-6" />

//           <Row className="mt-4 gap-4 items-center justify-between w-full">
//             <div></div>
//             <Typography>
//               {currentPage} / {totalPages}
//             </Typography>

//             <Row className="gap-2">
//               {currentPage >= totalPages ? (
//                 <Button text="Completed" disabled variant="reject" />
//               ) : (
//                 <Button
//                   text="Next"
//                   disabled={!userAnswer || submitLoading}
//                   onClick={() => setCurrentPage((p) => p + 1)}
//                 />
//               )}
//             </Row>
//           </Row>
//         </CardWrapper>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchQuestions } from "@/store/slices/getQuestionsSlice";
import { submitAnswer, resetSubmitAnswer } from "@/store/slices/submitAnswerSlice";
import { fetchQuizResult, resetQuizResult } from "@/store/slices/quizResultSlice";
import { Typography, Row, Button, CardWrapper } from "@/components/atoms";
import Stepper from "@/components/organisams/Stepper";
import Divider from "@/components/atoms/Divider";

export default function QuestionList() {
  const dispatch = useAppDispatch();
  const { questions, loading, error, totalPages } = useAppSelector(
    (state) => state.questionsList
  );
  const { userAnswer, correctAnswer, loading: submitLoading } = useAppSelector(
    (state) => state.submitAnswer
  );
  const { total, correct, loading: resultLoading } = useAppSelector(
    (state) => state.quizResult
  );

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch question on page change
  useEffect(() => {
    dispatch(fetchQuestions({ page: currentPage, limit: 1 }));
    dispatch(resetSubmitAnswer());
  }, [dispatch, currentPage]);

  const handleAnswer = (answer: string, questionId: number) => {
    if (userAnswer) return;
    dispatch(submitAnswer({ questionId, userAnswer: answer }));
  };

  const handleCompleted = () => {
    dispatch(fetchQuizResult());
  };

  const question = questions[0];

  return (
    <div className="mt-6 p-4">
      <Typography variant="2xl" weight="bold">
        Questions List
      </Typography>

      {loading && <p>Loading questions...</p>}
      {error && <p className="text-red-500 text-sm">Error: {error}</p>}

      {question && !total && (
        <CardWrapper className="mt-4 p-4 flex flex-col items-center gap-4">
          <Stepper current={currentPage} total={totalPages} />
          <Divider className="mb-4" />
          <Typography variant="lg" weight="bold" className="text-center">
            {question.questionText}
          </Typography>

          {/* Options */}
          <div className="mt-4 w-full space-y-3">
            {question.options.map((opt: string, i: number) => {
              const label = String.fromCharCode(65 + i);

              let bgClass = "bg-fog border-smoke text-black cursor-pointer";
              let textClass = "";

              if (userAnswer) {
                if (opt === correctAnswer) {
                  bgClass = "bg-green-500 border-green-500";
                  textClass = "text-white";
                } else if (opt === userAnswer && userAnswer !== correctAnswer) {
                  bgClass = "bg-red-500 border-red-500";
                  textClass = "text-white";
                } else {
                  bgClass = "bg-fog border-smoke text-black cursor-not-allowed";
                }
              }

              return (
                <Row
                  key={i}
                  className="justify-center items-center gap-3"
                  onClick={() => handleAnswer(opt, question.id)}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border ${bgClass}`}
                  >
                    {label}
                  </div>
                  <Typography className={`font-semibold ${textClass}`}>{opt}</Typography>
                </Row>
              );
            })}
          </div>

          <Divider className="mt-6" />

          {/* Pagination / Next */}
          <Row className="mt-4 gap-4 items-center justify-between w-full">
            <div></div>
            <Typography>
              {currentPage} / {totalPages}
            </Typography>
            <Row className="gap-2">
              {currentPage >= totalPages ? (
                <Button text="Completed" onClick={handleCompleted} />
              ) : (
                <Button
                  text="Next"
                  disabled={!userAnswer}
                  onClick={() => setCurrentPage((p) => p + 1)}
                />
              )}
            </Row>
          </Row>
        </CardWrapper>
      )}

      {/* Quiz Result */}
      {total !== null && (
        <CardWrapper className="mt-4 p-4 flex flex-col items-center gap-4">
          <Typography variant="lg">Total Questions: {total}</Typography>
          <Typography variant="lg">Correct Answers: {correct}</Typography>
          <Typography variant="2xl" weight="bold" className="text-green-600">
            Marks: {correct}
          </Typography>
          <Button
            text="Restart Quiz"
            onClick={() => {
              dispatch(resetQuizResult());
              setCurrentPage(1);
            }}
          />
        </CardWrapper>
      )}
    </div>
  );
}
