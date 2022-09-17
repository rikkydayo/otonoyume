import { addComments } from "../libs/comment";
import { useForm } from "react-hook-form"; // SubmitHandlerは、submitイベントに関する関数の型宣言に使う
import { ErrorMessage } from "@hookform/error-message";
import { supabase } from "../libs/supabase";
import { useState ,useEffect} from "react";
import styles from "../styles/Home.module.scss";

export const CommentsField = ({ blogId}) => {

  const {
    register, //inputなどに入力された値を参照するために使う
    handleSubmit,
    formState: { errors,},
  } = useForm();

  const [state, setState] = useState([]);
  useEffect(() => {
    const comment = async () => {
      const { data, error, status } = await supabase
        .from("comment_tbl")
        .select()
        .eq("blog_id", blogId);

      if (error && status !== 406) {
        throw error;
      }
      setState(...state, data);
    };
    comment();
  }, []);
  
  const sleep = waitTime => new Promise(resolve => setTimeout(resolve,waitTime))
  
  const reloadFunc = async function () {
      await sleep(1000)
      window.location.reload()
  }
  const sendLine = async (content) => {
    const text = `${content}`
    const response = await fetch(`https://utanoyume.com/api/${text}`);
    const data = await response.json();
  };

  const onSubmit = (data) => {
    const result = window.confirm("送信しますか？");
    if (result) {
      sendLine(`${blogId}にコメントがきたよ！${data.content}`);
      // addComments(data.name, data.content, blogId);
      // reloadFunc();
    }
  };
  return (
    <div>
      <div>
        <p className="text-xl font-bold text-gray-900">コメント欄：β版</p>
        <ul>
          {state.map((elm) => {
            return (
              <li key={elm.id}>
                <div className={styles.balloon}>
                  <p className="whitespace-pre-line">
                    {elm.user_name} : {elm.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <form
          className="grid grid-cols-1 gap-6 m-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="block">
            <p className="form-unit-title">お名前</p>
            <input
              className="rounded-md w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
              type="text"
              {...register("name", {
                max: 20,
                required: "お名前は必須項目です。",
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
          <div className="block">
            <p className="form-unit-title">コメント</p>
            <textarea
              className="rounded-md w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
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
            <button
              className="shadow bg-blue-500 hover:bg-yellow-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              送信
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};