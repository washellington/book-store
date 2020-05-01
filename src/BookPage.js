import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import BookInfo from "./BookInfo";
import { setBooks, removeBook } from "./actions";
import { useCookies } from "react-cookie";

export default function BookPage() {
  const { selectedBook } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookies] = useCookies(["wishList"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      {selectedBook && (
        <BookInfo
          onAdd={() => {
            let cookieValues = cookies.wishList || [];

            setCookies("wishList", [
              ...cookieValues,
              {
                imageUrl: selectedBook.imageUrl,
                id: selectedBook.id,
              },
            ]);

            dispatch(setBooks([selectedBook]));
          }}
          onRemove={() => {
            let cookieValues = cookies.wishList || [];

            setCookies(
              "wishList",
              cookieValues.filter((x) => x.id !== selectedBook.id)
            );
            dispatch(removeBook(selectedBook));
          }}
        />
      )}
    </div>
  );
}
