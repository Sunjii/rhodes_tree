import React, { useState } from "react";

export const SpwanManager = ({ spwanedCharList, onRemove, onElementClick }) => {
  console.log("[SpwanManager]: call..");
  console.log(spwanedCharList);

  //TODO: spwanManager에서 지원할 2가지 기능 구현
  // 삭제와 애니메이션 변경 기능
  // 삭제 버튼은 목록에 달아두고
  // 항목 선택시 그에 해당하는 애니메이션 리스트를 띄워주고 작동하도록 하자

  const onClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {spwanedCharList.map((c) => (
        <div>
          <span onClick={(e) => onElementClick(c)}>{c.name}</span>
          <button onClick={(e) => onRemove(c)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
