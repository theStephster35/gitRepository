var DirectionEnum =
{
	UP_LEFT: "upLeft",
	UP: "up",
	UP_RIGHT: "upRight",
	LEFT: "left",
	CENTER: "center",
	RIGHT: "right",
	DOWN_LEFT: "downLeft",
	DOWN: "down",
	DOWN_RIGHT: "downRight",
};

var ActionEnum =
{
	// UP_LEFT, UP_RIGHT
	CLIMB_OVER: AttributeEnum.CLIMB + " Over",

	// LEFT, RIGHT
	DRIFT: "Drift",
	LET_GO: "Let Go",

	// DOWN_LEFT, DOWN_RIGHT
	CLIMB_OFF: AttributeEnum.CLIMB + " Off",

	// UP_LEFT
	CLIMB_LEFT: AttributeEnum.CLIMB + " Left",
	JUMP_LEFT: AttributeEnum.JUMP + " Left",
	RISE_LEFT: "Rise Left",
	SWIM_UP_LEFT: AttributeEnum.SWIM + " Up-Left",
	CLIMB_OUT_LEFT: AttributeEnum.CLIMB + " Out Left",

	// UP
	CLIMB_UP: AttributeEnum.CLIMB + " Up",
	JUMP_UP: AttributeEnum.JUMP + " Up",
	RISE_UP: "Rise Up",
	SWIM_UP: AttributeEnum.SWIM + " Up",
	DIG_UP: AttributeEnum.DIG + " Up",

	// UP_RIGHT
	CLIMB_RIGHT: AttributeEnum.CLIMB + " Right",
	JUMP_RIGHT: AttributeEnum.JUMP + " Right",
	RISE_RIGHT: "Rise Right",
	SWIM_UP_RIGHT: AttributeEnum.SWIM + " Up-Right",
	CLIMB_OUT_RIGHT: AttributeEnum.CLIMB + " Out Right",

	// LEFT
	GRAB_LEFT: "Grab Left",
	RUN_LEFT: AttributeEnum.RUN + " Left",
	SWIM_LEFT: AttributeEnum.SWIM + " Left",
	DIG_LEFT: AttributeEnum.DIG + " Left",

	// CENTER
	STOP: "Stop",
	REST: "Rest",
	FLOAT: "Float",
	COLLECT: "Collect",

	// RIGHT
	GRAB_RIGHT: "Grab Right",
	RUN_RIGHT: AttributeEnum.RUN + " Right",
	SWIM_RIGHT: AttributeEnum.SWIM + " Right",
	DIG_RIGHT: AttributeEnum.DIG + " Right",

	// DOWN_LEFT
	FALL_LEFT: "Fall Left",
	SWIM_DOWN_LEFT: AttributeEnum.SWIM + " Down-Left",

	// DOWN
	CLIMB_DOWN: AttributeEnum.CLIMB + " Down",
	FALL_DOWN: "Fall Down",
	LAND: "Land",
	SPLASH: "Splash",
	SWIM_DOWN: AttributeEnum.SWIM + " Down",
	DIG_DOWN: AttributeEnum.DIG + " Down",

	// DOWN_RIGHT
	FALL_RIGHT: "Fall Right",
	SWIM_DOWN_RIGHT: AttributeEnum.SWIM + " Down-Right"
};
