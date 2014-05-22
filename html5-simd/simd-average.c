#include <stdio.h>
#if defined(__i386__)
#include <xmmintrin.h>
#elif defined(__arm__)
#include <arm_neon.h>
#endif

float average(float *src, int len) {
  float sum = 0.0;
  for (int i = 0; i < len; ++i) {
    sum = sum + src[i];
  }
  return sum/len;
}

void init(float *dst, int len) {
  for (int i = 0; i < len; ++i) {
    dst[i] = (float)i;
  }
}

#if defined(__i386__)
float simdAverage(float *src, int len) {
  __m128 sumx4 = _mm_setzero_ps();
  for (int i = 0; i < len; i += 4) {
    sumx4 = _mm_add_ps(sumx4, _mm_loadu_ps(src));
    src += 4;
  }
  float sumx4_mem[4];
  _mm_storeu_ps(sumx4_mem, sumx4);
  return (sumx4_mem[0] + sumx4_mem[1] + sumx4_mem[2] + sumx4_mem[3])/len;
}
#elif defined(__arm__)
float simdAverage(float *src, int len) {
  float32x4_t sumx4 = vdupq_n_f32(0.0);
  for (int i = 0; i < len; i += 4) {
    sumx4 = vaddq_f32(sumx4, vld1q_f32(src));
    src += 4;
  }
  return (vgetq_lane_f32(sumx4,0) + vgetq_lane_f32(sumx4,1) +
          vgetq_lane_f32(sumx4,2) + vgetq_lane_f32(sumx4,3))/len;
}
#else 
float simdAverage(float *src, int len) {
  return average(src, len);
}
#endif

int main() {
  #define SIZE 100000
  float a;
  float f32a[SIZE];
  init(f32a, SIZE);
  a = average(f32a, SIZE);
  printf("average = %f\n", a);
  a = simdAverage(f32a, SIZE);
  printf("simdAverage = %f\n", a);
}
