// @flow
import React from "react";
import { connectSize, Shaders, Node, GLSL } from "gl-react";

const shaders = Shaders.create({
  blurV1D: {
    frag: GLSL`precision highp float;
  varying vec2 uv;
  uniform sampler2D t, map;
  uniform vec2 direction, resolution;
  vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
    vec4 color = vec4(0.0);
    vec2 off1 = vec2(1.3846153846) * direction;
    vec2 off2 = vec2(3.2307692308) * direction;
    color += texture2D(image, uv) * 0.2270270270;
    color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
    color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
    color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
    color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
    return color;
  }
  void main() {
    gl_FragColor = blur9(t, uv, resolution, direction * texture2D(map, uv).rg);
  }`
  }
});

const NORM = Math.sqrt(2) / 2;
export const directionForPass = (p, factor, total) => {
  const f = (factor * 2 * Math.ceil(p / 2)) / total;
  switch (
    (p - 1) %
    4 // alternate horizontal, vertical and 2 diagonals
  ) {
    case 0:
      return [f, 0];
    case 1:
      return [0, f];
    case 2:
      return [f * NORM, f * NORM];
    default:
      return [f * NORM, -f * NORM];
  }
};

export const BlurV1D = connectSize(
  ({ children: t, direction, map, width, height }) => (
    <Node
      shader={shaders.blurV1D}
      uniforms={{ t, map, resolution: [width, height], direction }}
    />
  )
);

export const BlurV = connectSize(({ children, factor, map, passes }) => {
  const rec = (pass) =>
    pass <= 0
      ? (
          children
        )
      : (
      <BlurV1D map={map} direction={directionForPass(pass, factor, passes)}>
        {rec(pass - 1)}
      </BlurV1D>
        );
  return rec(passes);
});
