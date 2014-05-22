	.syntax unified
	.arch armv7-a
	.eabi_attribute 27, 3
	.fpu neon
	.eabi_attribute 20, 1
	.eabi_attribute 21, 1
	.eabi_attribute 23, 3
	.eabi_attribute 24, 1
	.eabi_attribute 25, 1
	.eabi_attribute 26, 2
	.eabi_attribute 30, 2
	.eabi_attribute 34, 1
	.eabi_attribute 18, 4
	.thumb
	.file	"simd-average.c"
	.text
	.align	2
	.global	average
	.thumb
	.thumb_func
	.type	average, %function
average:
	@ args = 0, pretend = 0, frame = 0
	@ frame_needed = 0, uses_anonymous_args = 0
	@ link register save eliminated.
	cmp	r1, #0
	ble	.L4
	subs	r0, r0, #4
	movs	r3, #0
	flds	s15, .L7
.L3:
	adds	r3, r3, #1
	adds	r0, r0, #4
	cmp	r3, r1
	flds	s14, [r0, #0]
	fadds	s15, s15, s14
	bne	.L3
.L2:
	fmsr	s13, r1	@ int
	fsitos	s14, s13
	fdivs	s13, s15, s14
	fmrs	r0, s13
	bx	lr
.L4:
	flds	s15, .L7
	b	.L2
.L8:
	.align	2
.L7:
	.word	0
	.size	average, .-average
	.align	2
	.global	init
	.thumb
	.thumb_func
	.type	init, %function
init:
	@ args = 0, pretend = 0, frame = 0
	@ frame_needed = 0, uses_anonymous_args = 0
	@ link register save eliminated.
	cmp	r1, #0
	ble	.L9
	subs	r0, r0, #4
	movs	r3, #0
.L11:
	fmsr	s14, r3	@ int
	fsitos	s15, s14
	adds	r3, r3, #1
	cmp	r3, r1
	fmrs	r2, s15
	str	r2, [r0, #4]!	@ float
	bne	.L11
.L9:
	bx	lr
	.size	init, .-init
	.align	2
	.global	simdAverage
	.thumb
	.thumb_func
	.type	simdAverage, %function
simdAverage:
	@ args = 0, pretend = 0, frame = 0
	@ frame_needed = 0, uses_anonymous_args = 0
	@ link register save eliminated.
	cmp	r1, #0
	vldr	d16, .L17
	vldr	d17, .L17+8
	ble	.L14
	movs	r3, #0
.L15:
	adds	r3, r3, #4
	vld1.32	{d18-d19}, [r0]!
	cmp	r1, r3
	vadd.f32	q8, q8, q9
	bgt	.L15
.L14:
	vmov.32	r0, d16[0]
	fmsr	s13, r0
	vmov.32	r3, d16[1]
	fmsr	s15, r3
	fadds	s14, s13, s15
	vmov.32	r2, d17[0]
	fmsr	s13, r2
	vmov.32	r3, d17[1]
	fmsr	s15, r3
	fadds	s14, s14, s13
	fmsr	s13, r1	@ int
	fadds	s14, s14, s15
	fsitos	s15, s13
	fdivs	s13, s14, s15
	fmrs	r0, s13
	bx	lr
.L18:
	.align	3
.L17:
	.word	0
	.word	0
	.word	0
	.word	0
	.size	simdAverage, .-simdAverage
	.section	.text.startup,"ax",%progbits
	.align	2
	.global	main
	.thumb
	.thumb_func
	.type	main, %function
main:
	@ args = 0, pretend = 0, frame = 400000
	@ frame_needed = 0, uses_anonymous_args = 0
	push	{r4, lr}
	sub	sp, sp, #399360
	sub	sp, sp, #640
	movw	r0, #34464
	sub	r2, sp, #4
	movt	r0, 1
	movs	r3, #0
	mov	r1, r2
.L20:
	fmsr	s14, r3	@ int
	fsitos	s15, s14
	adds	r3, r3, #1
	cmp	r3, r0
	fmrs	r4, s15
	str	r4, [r1, #4]!	@ float
	bne	.L20
	add	r3, sp, #399360
	flds	s15, .L24
	add	r3, r3, #636
.L21:
	adds	r2, r2, #4
	flds	s14, [r2, #0]
	cmp	r2, r3
	fadds	s15, s15, s14
	mov	r4, r2
	bne	.L21
	flds	s14, .L24+4
	fdivs	s15, s15, s14
	ldr	r1, .L24+8
	movs	r0, #1
	fcvtds	d16, s15
	fmrrd	r2, r3, d16
	bl	__printf_chk
	mov	r0, sp
	movw	r1, #34464
	movt	r1, 1
	bl	simdAverage
	ldr	r1, .L24+12
	fmsr	s14, r0
	fcvtds	d16, s14
	movs	r0, #1
	fmrrd	r2, r3, d16
	bl	__printf_chk
	movs	r0, #0
	add	sp, sp, #6784
	add	sp, sp, #393216
	pop	{r4, pc}
.L25:
	.align	2
.L24:
	.word	0
	.word	1203982336
	.word	.LC0
	.word	.LC1
	.size	main, .-main
	.section	.rodata.str1.4,"aMS",%progbits,1
	.align	2
.LC0:
	.ascii	"average = %f\012\000"
	.space	2
.LC1:
	.ascii	"simdAverage = %f\012\000"
	.ident	"GCC: (Ubuntu/Linaro 4.6.2-14ubuntu2~ppa1) 4.6.2"
	.section	.note.GNU-stack,"",%progbits
