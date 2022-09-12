import { addComments, getComments } from "../libs/comment";
import { useForm} from "react-hook-form"; // SubmitHandlerは、submitイベントに関する関数の型宣言に使う
import { ErrorMessage } from "@hookform/error-message";
import { text } from "@fortawesome/fontawesome-svg-core";

export const CommentsField = ({blogId}) => {
  const {
    register, //inputなどに入力された値を参照するために使う
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
//   const comments = getComments(blogId);
  const onSubmit =  (data) => {
    console.log(data);
    const result = window.confirm("送信しますか？");
    if (result) {
      addComments(data.content,userName=data.name,blogId=blogId);
    }
  };
  return (
    <div>
      <div>
        <p className="TableOfContentsHead">コメント欄</p>
        <ul>
          {/* {comments.map((comment) => (
            <li key={data.id}>
              <a>{comment.userName}</a>
              <a>{comment.body}</a>
            </li>
          ))} */}
        </ul>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-unit">
            <p className="form-unit-title">お名前</p>
            <input
            type="text"
              {...register("name", {
                max:20,
              })}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) =>
                message ? (
                  <p className="form-validateMessage">{message}</p>
                ) : null
              }
            />
          </div>
          <div className="form-unit">
            <p className="form-unit-title">コメント</p>
            <textarea
              placeholder="コメント内容を入力"
              {...register("content", {
                required: "コメント内容は必須項目です。",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="content"
              render={({ message }) =>
                message ? (
                  <p className="form-validateMessage">{message}</p>
                ) : null
              }
            />
          </div>
          <div className="form-actionArea">
            {!isValid && (
              <>
                <p className="form-validateMessage">
                  まだ全ての必須項目の入力が完了していません。
                </p>
              </>
            )}
            <div className="form-buttonWrapper">
              <button type="submit" className="form-submitButton">
                入力内容を確認する
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
