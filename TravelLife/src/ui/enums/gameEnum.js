var SpeciesEnum =
{
	HUMAN: "Human"
};

var AttributeEnum =
{
	HEALTH: "Health",
	SIGHT: "Sight",
	RECOVERY: "Recovery",
	ENDURANCE: "Endurance",
	CLIMB: "Climb",
	JUMP: "Jump",
	RUN: "Run",
	SWIM: "Swim"
};

var TileTypeEnum =
{
	BARRIER: "Barrier",
	DIRT: "Dirt",
	GROUND: "Ground",
	SKY: "Sky",
	WATER: "Water"
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

	UP_LEFT: "upLeft",
	CLIMB_LEFT: AttributeEnum.CLIMB + " Left",
	JUMP_LEFT: AttributeEnum.JUMP + " Left",
	RISE_LEFT: "Rise Left",
	SWIM_UP_LEFT: AttributeEnum.SWIM + " Up-Left",
	CLIMB_OUT_LEFT: AttributeEnum.CLIMB + " Out Left",

	UP: "up",
	CLIMB_UP: AttributeEnum.CLIMB + " Up",
	JUMP_UP: AttributeEnum.JUMP + " Up",
	RISE_UP: "Rise Up",
	SWIM_UP: AttributeEnum.SWIM + " Up",

	UP_RIGHT: "upRight",
	CLIMB_RIGHT: AttributeEnum.CLIMB + " Right",
	JUMP_RIGHT: AttributeEnum.JUMP + " Right",
	RISE_RIGHT: "Rise Right",
	SWIM_UP_RIGHT: AttributeEnum.SWIM + " Up-Right",
	CLIMB_OUT_RIGHT: AttributeEnum.CLIMB + " Out Right",

	LEFT: "left",
	GRAB_LEFT: "Grab Left",
	RUN_LEFT: AttributeEnum.RUN + " Left",
	SWIM_LEFT: AttributeEnum.SWIM + " Left",

	CENTER: "center",
	STOP: "Stop",
	REST: "Rest",
	FLOAT: "Float",

	RIGHT: "right",
	GRAB_RIGHT: "Grab Right",
	RUN_RIGHT: AttributeEnum.RUN + " Right",
	SWIM_RIGHT: AttributeEnum.SWIM + " Right",

	DOWN_LEFT: "downLeft",
	SWIM_DOWN_LEFT: AttributeEnum.SWIM + " Down-Left",

	DOWN: "down",
	CLIMB_DOWN: AttributeEnum.CLIMB + " Down",
	FALL_DOWN: "Fall Down",
	LAND: "Land",
	SPLASH: "Splash",
	SWIM_DOWN: AttributeEnum.SWIM + " Down",

	DOWN_RIGHT: "downRight",
	SWIM_DOWN_RIGHT: AttributeEnum.SWIM + " Down-Right"
};
