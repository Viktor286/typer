export const initTodaySessionUserStat = userStat => ({
  type: "INIT_USERSTAT",
  userStat
});

export const updateTodaySessionUserStat = (
  newCodingAreaState,
  prevUserStat
) => {
  const { todayCompleted: prevTodayCompletion } = prevUserStat;

  const {
    cpm: newCpm,
    timeCounted: newTimeCounted,
    corrections: newCorrections,
    mistakes: newMistakes
  } = newCodingAreaState.userStat.lastCompletion;

  return {
    type: "UPDATE_TODAY_COMPLETION_STAT",
    todayCompleted: {
      timeCountedSum: prevTodayCompletion.timeCountedSum + newTimeCounted,
      cpmAverage: prevTodayCompletion.cpmAverage
        ? (prevTodayCompletion.cpmAverage + newCpm) / 2
        : newCpm,
      correctionsSum: prevTodayCompletion.correctionsSum + newCorrections,
      mistakesSum: prevTodayCompletion.mistakesSum + newMistakes,
      keysSuccessSum:
        prevTodayCompletion.keysSuccessSum +
        newCodingAreaState.characterCorrectness.keysSuccess
    }
  };
};
