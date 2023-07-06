package com.codestates.global.response;

public class SingleResponseDto<T> {
  private T data;

  public SingleResponseDto(T data) {
    this.data = data;
  }
}
